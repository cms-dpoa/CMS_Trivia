from django.urls import include, path
from rest_framework import routers
from . import views
from django.conf.urls import url 

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'labels', views.LabelViewSet, basename="labels")
router.register(r'games', views.GameViewSet)
router.register(r'votes', views.VoteViewSet)
router.register(r'datas', views.DataViewSet)
router.register(r'questions', views.all_questions, basename="all_questions")
router.register(r'analysis', views.analysisView, basename="analysis")
router.register(r'leaderboard', views.leaderboard, basename="leaderboard")
router.register(r'myscores', views.myscores, basename="myscores")
router.register(r'reportProblems', views.ReportProblemViewSet)




# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    url(r'^questions/$', views.all_questions),
    url(r'^myscores/$', views.myscores),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]