from django.shortcuts import render
from .models import *
from .serializer import *
from rest_framework import views
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

# para usar os filtros
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def listar_professores(request):
    if request.method == 'GET':
        queryset = Cadastro.objects.all() #captura todos os dados da tabela cadastro. Isso não se faz no POST, por isso nele não há essa linha
        serializer = CadastroSerializer(queryset, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = CadastroSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def buscar_nome_professor(request):
    termo = request.get('nome', '')
    if termo:
        professores = Cadastro.objects.filter(nome_incontains = termo)
    
    else:
        professores = Cadastro.objects.all()

    serializer = CadastroSerializer(professores, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


class ProfessoresView(ListCreateAPIView): #o objetivo dessa classe é deixar como um formulário para podermos preencher
    queryset = Cadastro.objects.all()
    serializer_class = CadastroSerializer

    permission_classes = [IsAuthenticated] # acrescentei essa linha na classe "api/prof" 

#a classe RetrieveUpdateDestroyAPIView permite utilizar mais metodos crud do que a ListCreateAPIView
class ProfessoresDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Cadastro.objects.all()
    serializer_class = CadastroSerializer
    permission_classes = [IsAuthenticated]


class ProfessoresSearchView(ListAPIView):
    queryset = Cadastro.objects.all()
    serializer_class = CadastroSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, SearchFilter]
    search_fields = ['nome']


# aqui seria uma ótima prática separar por pastas, mas como é um exercicio pequeno e para treino, quis deixar tudo junto
# exercicio - fazer o cadasto de disciplina (views)
class DisciplinasView(ListCreateAPIView): # o objetivo dessa classe é deixar como um formulário para podermos preencher
    queryset =  CadastroDisciplina.objects.all()
    serializer_class = CadastroDisciplinaSerializer

    # autenticação para fazer a requisição
    permission_classes = [IsAuthenticated]

# acessa mais métodos que o ListCreateAPIView
class DisciplinasDetailView(RetrieveUpdateDestroyAPIView):
    queryset = CadastroDisciplina.objects.all()
    serializer_class = CadastroDisciplinaSerializer

    # autenticação para fazer a requisição
    permission_classes = [IsAuthenticated]


# exercicio - model de curso 
class CursosView(ListCreateAPIView):
    queryset = CadastroCurso.objects.all()
    serializer_class = CadastroCursoSerializer

class CursosDetailView(RetrieveUpdateDestroyAPIView):
    queryset = CadastroCurso.objects.all()
    serializer_class = CadastroCursoSerializer

# exercicio - cadastro de usuário
class RegisterUserView(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
