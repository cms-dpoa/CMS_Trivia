from django.shortcuts import render
from rest_framework import viewsets
import random

from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse

from .serializers import UserSerializer, LabelSerializer, GameSerializer, VoteSerializer, DataSerializer, OptionSerializer, QuestionSerializer
from .models import User, Label, Game, Vote, Data
from .game_objects import question, option

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('username')
    serializer_class = UserSerializer

class LabelViewSet(viewsets.ModelViewSet):
    queryset = Label.objects.all().order_by('id_label')
    serializer_class = LabelSerializer

class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all().order_by('id_game')
    serializer_class = GameSerializer

class VoteViewSet(viewsets.ModelViewSet):
    queryset = Vote.objects.all().order_by('id_vote')
    serializer_class = VoteSerializer

class DataViewSet(viewsets.ModelViewSet):
    queryset = Data.objects.all().order_by('id_dataset')
    serializer_class = DataSerializer

def generate_options(correct_label):

    options = []
    # Add correct option
    correct = Label.objects.filter(id_label=correct_label).values("id_label", "name")
    options.append({'id_label': correct[0]["id_label"], 'name': correct[0]["name"], 'is_correct': True})

    # Get all id_labels except for Miscellaneous and the correct id_label.
    possible_labels = Label.objects.exclude(name="Miscellaneous").values("id_label", "name")
    possible_labels = possible_labels.exclude(id_label=correct_label).values("id_label", "name")
    
    # Sample 3 id_labels to be used as wrong options.
    chosen_labels = random.sample(range(len(possible_labels)), k=3)
    
    # Add wrong options
    for i in chosen_labels:
        options.append({'id_label':possible_labels[i]['id_label'], 'name': possible_labels[i]['name'], 'is_correct': False })
    
    # Generate options dict with tags:
    option_tags = ["option_1", "option_2", "option_3", "option_4"]
    options_dict = {}

    random.shuffle(options)
    for opt, tag in zip(options, option_tags):
        options_dict[tag] = opt

    return options_dict

def question_level_one():

    #Get Miscelaneous label (it'll probably stay = 25)
    misc_idx = Label.objects.filter(name="Miscellaneous").values("id_label")[0]["id_label"]
    
    #Get all Datasets which are not Miscellaneous.
    possible_datasets = Data.objects.exclude(original_label=misc_idx).values("id_dataset", "title", "original_label")

    #Sample a single dataset
    chosen_idx = random.sample(range(len(possible_datasets)), k=1)[0]

    #Generate options for chosen dataset
    options = generate_options(possible_datasets[chosen_idx]['original_label'])

    #Build question dict
    question = {'id_data': possible_datasets[chosen_idx]['id_dataset'], \
                 'title': possible_datasets[chosen_idx]['title'], \
                     'options': options}
    return question
    

def question_level_two():

    #Get Miscelaneous label (it'll probably stay = 25)
    misc_idx = Label.objects.filter(name="Miscellaneous").values("id_label")[0]["id_label"]
    
    #Get all Datasets which are Miscellaneous.
    possible_datasets = Data.objects.filter(original_label=misc_idx).values("id_dataset", "title")

    #Sample a single dataset
    chosen_idx = random.sample(range(len(possible_datasets)), k=1)[0]

    #Build question dict
    question = {'id_data': possible_datasets[chosen_idx]['id_dataset'], \
                 'title': possible_datasets[chosen_idx]['title']
                 }

    return question

def all_questions(request):
    questions = {}
    for i in range(1, 11):
        tag = "questions_"+str(i)
        if i<6:
            questions[tag] = question_level_one()
        else:
            questions[tag] = question_level_two()
    return JsonResponse(data = questions)