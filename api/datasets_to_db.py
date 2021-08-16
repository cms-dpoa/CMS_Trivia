import sqlite3
import pandas as pd
import mysql

data_df = pd.read_csv('Data  .txt', delimiter = '\t')
id_dataset = list(data_df['id_dataset'].values)
title = list(data_df['title'].values)
original_label = list(data_df['original_label'].values)
year = list(data_df['year'].values)

con = sqlite3.connect('db.sqlite3')
c = con.cursor()

for i in range(len(id_dataset)):
    c.execute(f"Select * from api_label where id_label = {original_label[i]}")
    res = c.fetchone()[0]
    c.execute('INSERT INTO api_data (id_dataset, title, original_label_id, year) VALUES (?,?,?,?)', 
          (int(id_dataset[i]), title[i], res, int(year[i])), ) 

con.commit()
con.close()