from .models import User, Vote, Data
import pandas as pd
from django.db.models import Count


def get_votes_per_dataset():
    analysis = {}

    # Get the list of *unique* voted datasets (i.e: datasets that appeared in level 2)
    voted_sorted = Vote.objects.all().values('dataset').annotate(total=Count('dataset')).order_by('-total')
    voted_datasets = voted_sorted.values_list('dataset', flat=True).distinct()

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
    total_votes = float(votes_score_df['votes'].sum())
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
            "total_votes":total_votes,
            "scores": scores}



def get_top_2_labels_per_dataset(votes_per_dataset):
    datasets = []

    for title_dataset, info_dataset in votes_per_dataset.items():
        labels = info_dataset['labels']
        votes = info_dataset['votes']
        scores = info_dataset['scores']
        total_votes = info_dataset['total_votes']
        top_label_2 = ''
        percentage_top_label_2 = ''
        score_top_label_2 = ''

        if len(labels)>1:
            top_label_2 = labels[1]
            percentage_top_label_2 = 100*votes[1]/total_votes
            score_top_label_2 = scores[1]

        info_analysis = {"title": title_dataset,
                        "votes": total_votes,
                        "top_label_1": labels[0],
                        "percentage_top_label_1": 100*votes[0]/total_votes,
                        "score_top_label_1": scores[0],
                        "top_label_2": top_label_2,
                        "percentage_top_label_2": percentage_top_label_2,
                        "score_top_label_2": score_top_label_2,
                        }

        datasets.append(info_analysis)
    return datasets    



def get_analysis():
    votes_per_dataset = get_votes_per_dataset()
    analysis = {
        'votes_per_dataset': votes_per_dataset,
        'top2_labels_per_dataset': get_top_2_labels_per_dataset(votes_per_dataset)
    }

    return analysis


def get_votes_dataset_by_categories(idDataset, label_1, label_2, label_3, label_4):
    labels = {
        label_1[0]:0,
        label_2[0]:0,
        label_3[0]:0,
        label_4[0]:0
    }

    idDataset = idDataset[0]
    dataset = Data.objects.get(pk = idDataset)
    #Get all votes of the dataset
    votes = Vote.objects.filter(dataset = dataset)

    for vote in votes:
        name_label = vote.label.name
        if name_label  in labels:
            labels[name_label] += 1

    return {
                "idDataset": idDataset, 
                "labels": list(labels.keys()), 
                "votes": list(labels.values()),
            }