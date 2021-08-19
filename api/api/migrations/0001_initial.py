# Generated by Django 3.1.2 on 2021-08-19 04:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Data',
            fields=[
                ('id_dataset', models.IntegerField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=200)),
                ('year', models.IntegerField(default=2015)),
            ],
        ),
        migrations.CreateModel(
            name='Game',
            fields=[
                ('id_game', models.AutoField(primary_key=True, serialize=False)),
                ('score', models.FloatField(default=-1)),
            ],
        ),
        migrations.CreateModel(
            name='Label',
            fields=[
                ('id_label', models.IntegerField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('was_created', models.BooleanField(default=False)),
                ('was_checked', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('username', models.CharField(max_length=20, primary_key=True, serialize=False)),
                ('mean_score', models.FloatField(default=-1)),
                ('is_admin', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Vote',
            fields=[
                ('id_vote', models.AutoField(primary_key=True, serialize=False)),
                ('knowledgeLevel', models.FloatField()),
                ('dataset', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.data')),
                ('game', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.game')),
                ('label', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.label')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.user')),
            ],
        ),
        migrations.CreateModel(
            name='ReportProblem',
            fields=[
                ('id_report_problem', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=200)),
                ('description', models.CharField(max_length=1000)),
                ('suggested_solution', models.CharField(default='', max_length=1000)),
                ('date', models.DateField(auto_now=True)),
                ('status', models.CharField(choices=[('NEW', 'NEW'), ('IN POGRESS', 'IN POGRESS'), ('FINISHED', 'FINISHED')], default='NEW', max_length=20)),
                ('dataset', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.data')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.user')),
            ],
        ),
        migrations.AddField(
            model_name='game',
            name='username',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.user'),
        ),
        migrations.AddField(
            model_name='data',
            name='original_label',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.label'),
        ),
    ]
