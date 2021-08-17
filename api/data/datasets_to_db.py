import pandas as pd
import pymysql

conextion = pymysql.connect(user='root', 
                            password='root',
                            host='localhost',
                            database='cms_trivia')
cursor = conextion.cursor()


data_df = pd.read_csv('Data.txt', delimiter = '\t')
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
          

conextion.commit()
conextion.close()