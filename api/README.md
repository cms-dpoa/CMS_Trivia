# BackEnd - API CMS_Trivia

This project was create with [Django](https://www.djangoproject.com/).

## Installation

To install the dependencies of this project run:

```
pip install -r requirements.txt
```

## Object representation diagram

The [Object representation diagram](https://lucid.app/lucidchart/invitations/accept/inv_120d3bed-4464-4807-8027-a938fbcf0fbe) of this project was done in lucichart.

If you make changes to the database model you must run the following commands to apply the changes:

```
python manage.py makemigrations
python manage.py migrate
```

## Execute the project

to run the project in the development environment run:

```
python manage.py runserver
```

Open [http://localhost:8000](http://localhost:8000) to view it in the browser.
Any changes made, other than to the database model, will be displayed instantly.

## Backup

To perform these backups, the [django-dbbackup](https://django-dbbackup.readthedocs.io/en/master/) library is used. You can perform a backup at any stage of the project by running the following command:

```
python manage.py dbbackup
```

The backup created can be seen in the `backup` folder.

On the other hand, if you want to restore the project with the latest backup you must run:

```
python manage.py dbrestore
```

If for some reason, there is no backup and the database does not exist. You can easily raise it by running the commands

```
python manage.py makemigrations
python manage.py migrate
python .\data\load_init_data.py
```

After that you can create the backup as we mentioned before. The folder `data` has the initial data of the project and the script `load_init_data.py` loads that data in the database.
