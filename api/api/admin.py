from django.contrib import admin
from .models import User, Data, Label, Game, Vote

admin.site.register(User)
admin.site.register(Data)
admin.site.register(Label)
admin.site.register(Game)
admin.site.register(Vote)