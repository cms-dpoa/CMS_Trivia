from rest_framework import serializers
from .models import User, Data, Label, Game, Vote
from .game_objects import option, question

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'mean_score')

class DataSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Data
        fields = ('id_dataset', 'title', 'original_label_id', 'year')

class LabelSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Label
        fields = ('id_label', 'name', 'was_created')

class GameSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Game
        fields = ('id_game', 'username', 'score')

class VoteSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Vote
        fields = ('id_vote', 'dataset', 'label', 'user', 'game')

class OptionSerializer(serializers.Serializer):
    id_label = serializers.IntegerField()
    name = serializers.CharField(max_length=100)
    is_correct = serializers.BooleanField()

class QuestionSerializer(serializers.Serializer):
    id_data = serializers.IntegerField()
    title = serializers.CharField(max_length=200)
    options = OptionSerializer(many = True, required = False)

class QuestionaireSeralizer(serializers.Serializer):
    questions = QuestionSerializer(many = True)
