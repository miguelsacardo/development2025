from django.urls import path
from . import views
from .views import listar_professores, ProfessoresView, ProfessoresDetailView, buscar_nome_professor, ProfessoresSearchView, DisciplinasView, DisciplinasDetailView, CursosView, CursosDetailView, RegisterUserView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
) # isso eu pego no site https://django-rest-framework-simplejwt.readthedocs.io/en/latest/getting_started.html

urlpatterns = [
    path('professores', listar_professores),
    path('prof', ProfessoresView.as_view()), #como "ProfessoresView" é uma classe, deve-se colocar "as_view()"
    path('id/<int:pk>', ProfessoresDetailView.as_view()),

    # isso eu também pego no site. É necessário olhar os códigos da sessão "Project Configuration" e ver onde eles devem ser colocados
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('buscar/nome/', buscar_nome_professor),
    path('search/', ProfessoresSearchView.as_view()),

    # exercicio - fazer o cadasto de disciplina (urls)
    path('disciplinas', DisciplinasView.as_view()),
    path('disciplinas/id/<int:pk>', DisciplinasDetailView.as_view()),

    # exercicio - model do curso
    path('cursos', CursosView.as_view()),
    path('cursos/id/<int:pk>', CursosDetailView.as_view()), 

    # exercicio - cadastro de usuário
    path('usuarios', RegisterUserView.as_view())
]

