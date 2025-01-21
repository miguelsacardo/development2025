from django.urls import path
from . import views
from .views import listar_professores, ProfessoresView, ProfessoresDetailView

urlpatterns = [
    path('professores', listar_professores),
    path('prof', ProfessoresView.as_view()), #como "ProfessoresView" é uma classe, deve-se colocar "as_view()"
    path('id/<int:pk>', ProfessoresDetailView.as_view())
]
