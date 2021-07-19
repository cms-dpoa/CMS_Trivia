from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.parsers import JSONParser 
import random

from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse
from django.db.models import Avg

from .serializers import UserSerializer, LabelSerializer, GameSerializer, VoteSerializer, DataSerializer, OptionSerializer, QuestionSerializer
from .models import User, Label, Game, Vote, Data
from .game_objects import question, option

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('username')
    serializer_class = UserSerializer
    
    #Override POST to create new Game instance and return id_game.
    def create(self, request):
        user_data = request.data
        prev_user = User.objects.filter(username = user_data["username"])
        #Check if username already exists.
        if prev_user.exists():
            #Instantiate new game
            last_gameid = Game.objects.latest('id_game').id_game
            new_game = Game.objects.create(id_game = last_gameid+1, username=prev_user[0])
            new_game.save()
        else:
            #Create new_user with mean_score = -1
            new_user = User.objects.create(username=user_data["username"], mean_score = -1)
            new_user.save()
            #Instantiate new game
            last_gameid = Game.objects.latest('id_game').id_game
            new_game = Game.objects.create(id_game = last_gameid+1, username=new_user)
            new_game.save()
        return JsonResponse(data = {"id_game": last_gameid+1})

class LabelViewSet(viewsets.ModelViewSet):
    queryset = Label.objects.all().order_by('id_label')
    serializer_class = LabelSerializer


class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all().order_by('id_game')
    serializer_class = GameSerializer

    #Override PUT to update score of game and update mean_score of player
    #The url to PUT includes the id_game. ej: http://127.0.0.1:8000/games/1/
    def update(self, request, *args, **kwargs):
        game_data = request.data
       
        #Update score of current game (previously -1)
        current_game = Game.objects.get(id_game=game_data["id_game"])
        current_game.score = game_data["score"]
        current_game.save()
        
        #Compute and update mean_score of player
        mean_score = Game.objects.filter(username = game_data["username"]).aggregate(Avg('score'))['score__avg']
        player = User.objects.get(username = game_data["username"])
        player.mean_score = mean_score
        player.save()
        
        return JsonResponse(data = {"score": game_data["score"], \
                                "mean_score": mean_score})


class VoteViewSet(viewsets.ModelViewSet):
    queryset = Vote.objects.all().order_by('id')
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

class all_questions(viewsets.GenericViewSet):
    def list(self, request):
        questions = {}
        for num_question in range(1, 11):
            tag = "questions_"+str(num_question)
            if num_question<6:
                questions[tag] = question_level_one()
            else:
                questions[tag] = question_level_two()
        return JsonResponse(data = questions)
