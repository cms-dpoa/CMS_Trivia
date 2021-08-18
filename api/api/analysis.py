from .models import User, Label, Game, Vote, Data
import numpy as np
import pandas as pd


def get_analysis():
    analysis = {}

    # Get the list of *unique* voted datasets (i.e: datasets that appeared in level 2)
    voted_datasets = Vote.objects.all().values_list('dataset', flat=True).distinct()

    # Get vote statistics for each dataset
    for dataset in voted_datasets:
        analysis[Data.objects.get(pk=dataset).title] = get_votes(dataset)

    return analysis


def get_votes(dataset):
    dataset = Data.objects.get(pk = dataset)

    #Get all votes for dataset
    votes = Vote.objects.filter(dataset = dataset)
    labels = [vote.label.name for vote in votes]

    #Get mean scores of players who voted
    players = votes.values_list("user_id", flat=True)
    player_score = [User.objects.get(pk=player).mean_score for player in players]

    #Compute amplitudes for each candidate
    votes_df = pd.DataFrame.from_records(votes.values())
    votes_df["player_score"] = player_score
    votes_df["labels"] = labels
    votes_df = votes_df[["labels", "player_score"]].groupby("labels", as_index=False).sum()
    
    #Only return top 3.
    votes_df = votes_df.sort_values("player_score", ascending = False)
    labels = list(votes_df["labels"].values)[:3]
    amplitudes = list(votes_df["player_score"].values)[:3]
    

    return {"title": dataset.title, 
            "labels": labels, \
            "amplitudes": amplitudes}

