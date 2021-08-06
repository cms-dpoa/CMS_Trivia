from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.parsers import JSONParser 
import random

from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse
from django.db.models import Avg

from .serializers import UserSerializer, LabelSerializer, GameSerializer, VoteSerializer, DataSerializer
from .models import User, Label, Game, Vote, Data
from .views_utils import question_level_one, question_level_two, generate_options, misc_categories
from .analysis import get_analysis, get_votes

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

    #Override POST to create new Game instance and return id_game.
    def create(self, request):
        label_data = request.data
        prev_label = Label.objects.filter(name = label_data["name"])
        if prev_label.exists():
            return JsonResponse(data = {"message": "Label already exists"})
        else:
            last_labelid = Label.objects.latest('id_label').id_label
            new_label = Label.objects.create(id_label = last_labelid+1, name=label_data["name"], was_created = True)
            new_label.save()
            return JsonResponse(data = {"id_label": last_labelid+1,"message": "Label created correctly."})

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

class all_questions(viewsets.GenericViewSet):
    def list(self, request):

        try:
            mode = request.GET["mode"]
        except:
            print("Easy mode not specified, defaulting to normal.")
            mode = 'normal'

        #Get artificial sub-categories for the Miscelaneous categories
        level_two_categories = misc_categories()

        #Build 10 question dictionary for game setup
        questions = {}
        for num_question in range(1, 11):
            tag = num_question
            if num_question<6:
                questions[tag] = question_level_one(mode)
            else:
                questions[tag] = question_level_two(level_two_categories)

        return JsonResponse(data = questions)

class analysisView(viewsets.GenericViewSet):
    def list(self, request):
        return JsonResponse(data = get_analysis())
    
    def create(self, request):
        dataset = request.data["dataset"]
        return JsonResponse(data = get_votes(dataset = dataset))
