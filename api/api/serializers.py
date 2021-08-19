from rest_framework import serializers
from .models import User, Data, Label, Game, Vote, ReportProblem

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'mean_score')

class DataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Data
        fields = ('id_dataset', 'title', 'original_label', 'year')
        depth=1


class LabelSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Label
        fields = ('id_label', 'name', 'was_created', 'was_checked')

class GameSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Game
        fields = ('id_game', 'username', 'score')
        depth=1


class VoteSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Vote
        fields = ('id', 'dataset', 'label', 'user', 'game')
        depth=1
    

class ReportProblemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReportProblem
        fields = ('id_report_problem', 'title' ,'description','suggested_solution', 'date', 'status', 'user', 'dataset')
        depth=2

