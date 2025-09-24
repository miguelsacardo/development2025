from django.urls import path
from .views import *


urlpatterns = [
    path('columns', ColumnView.as_view()),
    path('tasks', TaskView.as_view()),
    path('tasks/<int:pk>', TaskRDV.as_view()),
    path('columns/<int:pk>', ColumnRDV.as_view())
]