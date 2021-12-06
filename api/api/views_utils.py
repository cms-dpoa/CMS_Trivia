from .models import User, Label, Game, Vote, Data
import random
import numpy as np


def generate_options(correct_label, mode):

    options = []
    # Add correct option
    correct = Label.objects.filter(id_label=correct_label).values("id_label", "name")
    options.append(
        {
            "id_label": correct[0]["id_label"],
            "name": correct[0]["name"],
            "is_correct": True,
            "show": True,
        }
    )

    if mode == "easy":
        possible_labels = Label.objects.filter(
            name__contains="Standard Model Physics"
        ).values("id_label", "name")
        possible_labels = possible_labels.exclude(id_label=correct_label).values(
            "id_label", "name"
        )
        possible_labels = possible_labels.exclude(was_created=True).values(
            "id_label", "name"
        )

    else:
        possible_labels = Label.objects.exclude(name="Miscellaneous").values(
            "id_label", "name"
        )
        possible_labels = possible_labels.exclude(id_label=correct_label).values(
            "id_label", "name"
        )
        possible_labels = possible_labels.exclude(was_created=True).values(
            "id_label", "name"
        )

    # Sample 3 id_labels to be used as wrong options.
    chosen_labels = random.sample(range(len(possible_labels)), k=3)

    # Add wrong options
    for i in chosen_labels:
        options.append(
            {
                "id_label": possible_labels[i]["id_label"],
                "name": possible_labels[i]["name"],
                "is_correct": False,
                "show": True,
            }
        )

    # Generate options dict with tags:
    option_tags = [1, 2, 3, 4]
    options_dict = {}

    random.shuffle(options)
    for opt, tag in zip(options, option_tags):
        options_dict[tag] = opt

    correct = None
    for opt_key in options_dict.keys():
        if options_dict[opt_key]["is_correct"] == True:
            correct = opt_key
            break

    return options_dict, correct


def question_level_one(mode="normal"):

    if mode == "easy":
        # Only sample from Datasets in the standard model
        possible_labels = Label.objects.filter(
            name__contains="Standard Model Physics"
        ).values("id_label")
    else:
        # Get categories that are not Miscellaneous
        possible_labels = Label.objects.exclude(name="Miscellaneous").values("id_label")

    # Get all Datasets in a random category and re-sample if category is empty
    possible_datasets = []
    while len(possible_datasets) < 1:
        # Sample a label from the possible labels
        chosen_label = random.choice(possible_labels)["id_label"]
        # Get all datasets inside that category
        possible_datasets = Data.objects.filter(original_label=chosen_label).values(
            "id_dataset", "title", "original_label"
        )

    # Sample a single dataset
    chosen_dataset = random.choice(possible_datasets)

    # Generate options for chosen dataset
    options, correct = generate_options(chosen_dataset["original_label"], mode=mode)
    # Build question dict
    question = {
        "id_data": chosen_dataset["id_dataset"],
        "title": chosen_dataset["title"].split("/")[1],
        "correct": correct,
        "options": options,
    }
    return question


def question_level_two(categories):
    # Sample artifical category
    chosen_category = random.choice(categories)

    # Get all Datasets which contain this artificial category in their title.
    possible_datasets = Data.objects.filter(title__contains=chosen_category).values(
        "id_dataset", "title"
    )

    # Sample a single dataset
    chosen_dataset = random.choice(possible_datasets)

    # Build question dict
    question = {
        "id_data": chosen_dataset["id_dataset"],
        "title": chosen_dataset["title"].split("/")[1],
    }

    return question


def misc_categories():

    # Get Miscelaneous label
    misc_idx = Label.objects.filter(name="Miscellaneous").values("id_label")[0][
        "id_label"
    ]

    # Get title of all datasets which are Miscellaneous.
    misc_titles = np.array(
        Data.objects.filter(original_label=misc_idx).values_list("title", flat=True)
    )

    titles_underscore = []
    for title in misc_titles:
        underscore = title.find("_")
        ppd = title.find("PPD")
        if ppd == -1:
            if underscore == -1:
                titles_underscore.append(title[1:])
            else:
                titles_underscore.append(title[1 : underscore + 1])

    # Artifical categories
    titles_underscore = np.array(titles_underscore)
    artificial_categories = np.unique(titles_underscore, return_counts=False)

    return artificial_categories
