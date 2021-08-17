import pandas as pd
import pymysql

conextion = pymysql.connect(user='root', 
                            password='root',
                            host='localhost',
                            database='cms_trivia')
cursor = conextion.cursor()


labels = pd.read_csv('Label.txt', delimiter = '\t')
ids = list(labels['id_label'].values)
names = list(labels['name'].values)
was_created = list(labels['was_created'].values)

for i in range(len(ids)):
    command = f"INSERT INTO api_label VALUES({ids[i]}, '{names[i]}', {was_created[i]})"
    cursor.execute(command)

conextion.commit()
conextion.close()