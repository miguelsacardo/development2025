from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model

from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

class CadastroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cadastro #referencia o Model de cadastro
        many = True #lida quando queremos fazer vários registros de uma vez
        fields = '__all__' #campos que serão transformados de json para python e vice versa


# aqui seria uma ótima prática separar por pastas, mas como é um exercicio pequeno e para treino, quis deixar tudo junto
# exercicio - fazer o crud de disciplina (serializer)
class CadastroDisciplinaSerializer(serializers.ModelSerializer):

    # isso faz a response da disciplina trazer o nome do curso ao invés da foreign key que representa o curso que cada disciplina tem
    # na prática: curso: 1 vai virar curso:"curso que tem o id 1"
    curso = serializers.SlugRelatedField(slug_field="nomeCurso", queryset=CadastroCurso.objects.all())
    class Meta:
        model = CadastroDisciplina
        many = True
        fields = '__all__'


# exercicio - model de curso 
class CadastroCursoSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = CadastroCurso
        many = True
        fields = '__all__'

# exercicio - cadastro de usuário
# o Model User é pego diretamente do Django, pois ele já tem um Modelo Base de usuário!
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
    
    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data.get('password'))
        return super(UserSerializer, self).create(validated_data)
