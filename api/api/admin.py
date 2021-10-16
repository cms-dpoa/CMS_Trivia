from django.contrib import admin
from .models import User, Data, Label, Game, Vote, ReportProblem
from .models_backup import (
    UserBackup,
    GameBackup,
    LabelBackup,
    DataBackup,
    VoteBackup,
    ReportProblemBackup,
)


admin.site.register(User, UserBackup)
admin.site.register(Data, DataBackup)
admin.site.register(Label, LabelBackup)
admin.site.register(Game, GameBackup)
admin.site.register(Vote, VoteBackup)
admin.site.register(ReportProblem, ReportProblemBackup)
