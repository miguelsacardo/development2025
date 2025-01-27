from django.shortcuts import render
from .models import *
from .serializer import *
from rest_framework import views
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
@api_view(['GET', 'POST'])
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
    
        


class ProfessoresView(ListCreateAPIView): #o objetivo dessa classe é deixar como um formulário para podermos preencher
    queryset = Cadastro.objects.all()
    serializer_class = CadastroSerializer

    permission_classes = [IsAuthenticated] # acrescentei essa linha na classe "api/prof" 

#a classe RetrieveUpdateDestroyAPIView permite utilizar mais metodos crud do que a ListCreateAPIView
class ProfessoresDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Cadastro.objects.all()
    serializer_class = CadastroSerializer


