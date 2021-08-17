import pandas as pd
import sqlite3

from pathlib import Path
BASE_DIR = Path(__file__).resolve().parent.parent


def add_labels_to_DB(cursor):
    labels = pd.read_csv(BASE_DIR/'data/Label.txt', delimiter = '\t')
    ids = list(labels['id_label'].values)
    names = list(labels['name'].values)
    was_created = list(labels['was_created'].values)

    for i in range(len(ids)):
        command = f"INSERT INTO api_label VALUES({ids[i]}, '{names[i]}', {was_created[i]})"
        cursor.execute(command)
    print("Labels added to DB.....OK!")



def add_datasets_to_DB(cursor):
    data_df = pd.read_csv(BASE_DIR/'data/Data.txt', delimiter = '\t')
    id_dataset = list(data_df['id_dataset'].values)
    title = list(data_df['title'].values)
    original_label = list(data_df['original_label'].values)
    year = list(data_df['year'].values)

    for i in range(len(id_dataset)):
        query_get_label = f"Select * from api_label where id_label = {original_label[i]}"
        cursor.execute(query_get_label)
        id_label = cursor.fetchone()[0]

        query_add_dataset = "INSERT INTO api_data (id_dataset, title, original_label_id, year) VALUES (%d,'%s',%d,%d)" %(int(id_dataset[i]), title[i], id_label, int(year[i]))  
        cursor.execute(query_add_dataset)
    print("Datasets added to DB.....OK!")



conextion = sqlite3.connect('db.sqlite3')
cursor = conextion.cursor()

add_labels_to_DB(cursor)
add_datasets_to_DB(cursor)
# admin = User.objects.create_user('admin', 'jedavalo@espol.edu.ec', 'admin', is_superuser=True, is_staff=True)


conextion.commit()
conextion.close()