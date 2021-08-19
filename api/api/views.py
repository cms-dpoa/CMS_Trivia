from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.parsers import JSONParser 
from django.shortcuts import get_object_or_404
from rest_framework import status
import sys


from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse
from django.db.models import Avg

from .serializers import UserSerializer, LabelSerializer, GameSerializer, VoteSerializer, DataSerializer, ReportProblemSerializer
from .models import User, Label, Game, Vote, Data, ReportProblem
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
    def list(self, request):
        queryset = Label.objects.all()
        parameters = dict(request.GET)
        exclude_miscellaneous = parameters.get('exclude_miscellaneous')
        created = parameters.get('created')
        checked = parameters.get('checked')

        if exclude_miscellaneous is not None:
            queryset = queryset.exclude(name="Miscellaneous")
        if created is not None:
            created = created[0].lower() == 'true'  
            queryset = queryset.filter(was_created=created)
        if checked is not None:
            checked = checked[0].lower() == 'true'  
            queryset = queryset.filter(was_checked=checked)

        serializer = LabelSerializer(queryset, many=True)
        return JsonResponse(serializer.data, safe=False)

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


    def update(self, request, pk=None):
        data = JSONParser().parse(request)
        queryset = Label.objects.all()
        label = get_object_or_404(queryset, pk=pk)
        serializer = LabelSerializer(label, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def destroy(self, request, pk=None):
        queryset = Label.objects.all()
        label = get_object_or_404(queryset, pk=pk)
        label.delete()
        return JsonResponse(data = {"message": "Label %s Deleted"%pk})
        

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
        mean_score = Game.objects.filter(username = game_data["username"])
        mean_score = mean_score.exclude(score = -1).aggregate(Avg('score'))['score__avg']
        player = User.objects.get(username = game_data["username"])
        player.mean_score = mean_score
        player.save()
        
        return JsonResponse(data = {"score": game_data["score"], \
                                "mean_score": mean_score})


class VoteViewSet(viewsets.ModelViewSet):
    queryset = Vote.objects.all().order_by('id')
    serializer_class = VoteSerializer
    
    #Override POST to create new Game instance and return id_game.
    def create(self, request):
        vote_data = request.data
        try:
            last_voteid = Vote.objects.latest('id').id
            v_dataset = Data.objects.get(id_dataset = int(vote_data["dataset"]))
            v_label = Label.objects.get(id_label = int(vote_data["label"]))
            v_user = User.objects.get(username = vote_data["user"])
            v_game = Game.objects.get(id_game = int(vote_data["game"]))
            new_vote = Vote.objects.create(id = last_voteid+1,\
                                            dataset = v_dataset, \
                                            label = v_label, \
                                            user = v_user, \
                                            game = v_game)
            new_vote.save()
            return JsonResponse({"message":"Vote created"})
        except:
            return JsonResponse({"message":"Error"})


class DataViewSet(viewsets.ModelViewSet):
    queryset = Data.objects.all().order_by('id_dataset')
    serializer_class = DataSerializer

    def retrieve(self, request, pk=None):
        queryset = Data.objects.all()
        dataset = get_object_or_404(queryset, pk=pk)
        serializer = DataSerializer(dataset)
        return JsonResponse(serializer.data)        


    def update(self, request, pk=None):
        data = JSONParser().parse(request)
        queryset = Data.objects.all()
        dataset = get_object_or_404(queryset, pk=pk)
        label = None
        try: 
            label = get_object_or_404(Label.objects.all(), pk=data['original_label'])
        except:
            return JsonResponse(data = {"message": 'Wrong Label'}, status=status.HTTP_400_BAD_REQUEST)
        dataset.original_label = label
        dataset.save()
        serializer = DataSerializer(dataset)
        return JsonResponse(serializer.data, status=status.HTTP_200_OK)


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


class leaderboard(viewsets.GenericViewSet):
    def list(self, request):
        allusers = User.objects.order_by("mean_score")
        if allusers.count() >= 10:
            top = allusers[allusers.count()-10:][::-1]
        else:
            top = allusers[:][::-1]
        ranking = {}
        for i, u in enumerate(top):
            num_games = Game.objects.filter(username = u.username).count()
            ranking[i+1] = {"username": u.username, "num_games": num_games, "score": u.mean_score}
        return JsonResponse(data = ranking)


class myscores(viewsets.GenericViewSet):
    def list(self, request):
        try:
            user = request.GET["user"]
            games = Game.objects.filter(username = user)
            scores = {}
            for game in games:
                scores[game.id_game] = game.score
            return JsonResponse(data = scores)
        except:
            return JsonResponse(data = {"message": "Error"})


class ReportProblemViewSet(viewsets.ModelViewSet):
    queryset = ReportProblem.objects.all().order_by('date')
    serializer_class = ReportProblemSerializer

    def create(self, request):
        report = JSONParser().parse(request)
        report_serializer = ReportProblemSerializer(data=report)
        if report_serializer.is_valid():
            try: 
                report['user'] = User.objects.get(pk=report['user'])
                report['dataset'] = Data.objects.get(pk=report['dataset'])
            except Exception: 
                ex_type, ex_value, ex_traceback = sys.exc_info()
                return JsonResponse(data = {"message": '%s %s'%(ex_type, ex_value)}, status=status.HTTP_400_BAD_REQUEST)
            ReportProblem.objects.create(**report).save()
            return JsonResponse(data = {"message": "Report created successfully"}, status=status.HTTP_201_CREATED) 
        return JsonResponse(report_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        data = JSONParser().parse(request)
        queryset = ReportProblem.objects.all()
        report = get_object_or_404(queryset, pk=pk)
        serializer = ReportProblemSerializer(report, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

