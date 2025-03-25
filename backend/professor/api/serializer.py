from rest_framework import serializers
from .models import *

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
