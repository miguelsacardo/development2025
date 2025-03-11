from django.db import models

class Cadastro(models.Model):
    ni = models.CharField(max_length=15)
    nome = models.CharField(max_length=255)
    email = models.EmailField()
    cel = models.CharField(max_length=255)
    ocup = models.FloatField()
    
# exercicio - fazer o crud de disciplina
class CadastroDisciplina(models.Model):
    nome_completo = models.TextField()
    sigla = models.CharField(max_length=10)
    # curso = models.ForeignKey() # o curso será uma foreign key
    semestre = models.IntegerField()
    cargahoraria = models.FloatField()