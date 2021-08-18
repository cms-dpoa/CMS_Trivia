from django.db import models

class User(models.Model):
    username = models.CharField(max_length=20, primary_key=True)
    mean_score = models.FloatField(default=-1)
    
    def __str__(self):
        return self.username


class Game(models.Model):
    id_game = models.IntegerField(primary_key=True)
    username = models.ForeignKey(User, on_delete=models.CASCADE)
    score = models.FloatField(default=-1)

    def __str__(self):
        return f"{self.id_game}, {self.username}"


class Label(models.Model):
    id_label = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100)
    was_created = models.BooleanField(default=False)
    was_checked = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class Data(models.Model):
    id_dataset = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=200)
    year = models.IntegerField(default=2015)
    original_label = models.ForeignKey(Label, on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class Vote(models.Model):
    dataset = models.ForeignKey(Data, on_delete=models.CASCADE)
    label = models.ForeignKey(Label, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    knowledgeLevel = models.FloatField()

    def __str__(self):
        return f"{self.id}, {self.dataset}, {self.label}"


class ReportProblem(models.Model):
    STATUS = (
        ('NEW', 'NEW'),
        ('IN POGRESS', 'IN POGRESS'),
        ('FINISHED', 'FINISHED'),
    )

    id_report_problem = models.AutoField(primary_key=True)
    title = models.CharField(max_length=200)
    description = models.CharField(max_length=1000)
    date = models.DateField(auto_now=True)
    status = models.CharField(max_length=20, blank=False, choices=STATUS)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    dataset = models.ForeignKey(Data, on_delete=models.CASCADE)
