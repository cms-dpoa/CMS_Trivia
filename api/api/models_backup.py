from django.contrib import admin
from import_export import resources
from import_export.admin import ImportExportModelAdmin
from .models import User, Data, Label, Game, Vote, ReportProblem


def backUser():
    dataset = UserResource().export()
    print(dataset.csv)


class UserResource(resources.ModelResource):
    class Meta:
        model = User
        exclude = ("id",)
        import_id_fields = (
            "username",
            "mean_score",
            "is_admin",
            "is_superuser",
        )


class UserBackup(ImportExportModelAdmin, admin.ModelAdmin):
    resource_class = UserResource


class GameResource(resources.ModelResource):
    class Meta:
        model = Game
        exclude = ("id",)
        import_id_fields = (
            "id_game",
            "username",
            "score",
        )


class GameBackup(ImportExportModelAdmin, admin.ModelAdmin):
    resource_class = GameResource


class LabelResource(resources.ModelResource):
    class Meta:
        model = Label
        exclude = ("id",)
        import_id_fields = ("id_label", "name", "was_created", "was_checked")


class LabelBackup(ImportExportModelAdmin, admin.ModelAdmin):
    resource_class = LabelResource


class DataResource(resources.ModelResource):
    class Meta:
        model = Data
        exclude = ("id",)
        import_id_fields = ("id_dataset", "title", "year", "original_label")


class DataBackup(ImportExportModelAdmin, admin.ModelAdmin):
    resource_class = DataResource


class VoteResource(resources.ModelResource):
    class Meta:
        model = Vote
        exclude = ("id",)
        import_id_fields = (
            "id_vote",
            "dataset",
            "label",
            "user",
            "game",
            "knowledgeLevel",
        )


class VoteBackup(ImportExportModelAdmin, admin.ModelAdmin):
    resource_class = VoteResource


class ReportProblemResource(resources.ModelResource):
    class Meta:
        model = ReportProblem
        exclude = ("id",)
        import_id_fields = (
            "id_report_problem",
            "title",
            "suggested_solution",
            "date",
            "status",
            "user",
            "dataset",
        )


class ReportProblemBackup(ImportExportModelAdmin, admin.ModelAdmin):
    resource_class = ReportProblemResource
