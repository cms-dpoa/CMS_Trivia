import sqlite3
import pandas as pd
import numpy as np

labels = pd.read_csv('Label.txt', delimiter = '\t')
ids = list(labels['id_label'].values)
names = list(labels['name'].values)
was_created = list(labels['was_created'].values)

con = sqlite3.connect('db.sqlite3')
c = con.cursor()

for i in range(len(ids)):
    command = f"INSERT INTO api_label VALUES({ids[i]}, '{names[i]}', {was_created[i]})"
    c.execute(command)

con.commit()
con.close()