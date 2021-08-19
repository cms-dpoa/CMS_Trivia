from .models import User, Vote, Data
import pandas as pd


def get_votes_per_dataset():
    analysis = {}

    # Get the list of *unique* voted datasets (i.e: datasets that appeared in level 2)
    voted_datasets = Vote.objects.all().values_list('dataset', flat=True).distinct()

    # Get vote statistics for each dataset
    for dataset in voted_datasets:
        votes = get_votes(dataset)
        if( sum(votes['votes']) > 0 ):
            analysis[Data.objects.get(pk=dataset).title] = votes

    return analysis



def get_votes(dataset):
    dataset = Data.objects.get(pk = dataset)

    #Get all votes for dataset
    votes = Vote.objects.filter(dataset = dataset)
    labels = [vote.label.name for vote in votes]

    #Get mean scores of players who voted
    players = votes.values_list("user_id", flat=True)
    player_score = [User.objects.get(pk=player).mean_score for player in players]

    #Compute score for each candidate
    votes_df = pd.DataFrame.from_records(votes.values())
    votes_df["player_score"] = player_score
    votes_df["labels"] = labels
    count_label = votes_df.groupby('labels', as_index=False).count().iloc[:,:2]
    votes_score_df = votes_df.groupby(['labels']).apply(lambda x: (x['knowledgeLevel']*x['player_score']/25).sum()).reset_index()
    votes_score_df = votes_score_df.merge(count_label)
    votes_score_df.columns = ['labels','score','votes']
    votes_score_df.sort_values(by='score', ascending=False, inplace=True)
    votes_score_df = votes_score_df.head(3)
    # votes_df = votes_df[["labels", "player_score"]].groupby("labels", as_index=False).sum()
    
    #Only return top 3.
    # votes_df = votes_df.sort_values("player_score", ascending = False)
    labels = list(votes_score_df["labels"].values)
    scores = list(votes_score_df["score"].values)
    votes = list(votes_score_df["votes"].values.astype(float))

    return {"title": dataset.title, 
            "labels": labels, 
            "votes": votes,
            "scores": scores}




def get_top_2_labels_per_dataset():
    datasets = {}
    return datasets    



def get_analysis():
    analysis = {
        'votes_per_dataset': get_votes_per_dataset(),
        'top2_labels_per_dataset': get_top_2_labels_per_dataset()
    }

    return analysis