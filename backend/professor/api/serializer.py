from rest_framework import serializers
from .models import *

class CadastroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cadastro #referencia o Model de cadastro
        many = True #lida quando queremos fazer vários registros de uma vez
        fields = '__all__' #campos que serão transformados de json para python e vice versa

# exercicio - fazer o crud de disciplina (serializer)
class CadastroDisciplinaSerializer(serializers.ModelSerializer):
    class Meta:
        model = CadastroDisciplina
        many = True
        fields = '__all__'
