from django.db import models
from django.contrib.auth.models import AbstractUser

class Cadastro(models.Model):
    ni = models.CharField(max_length=15)
    nome = models.CharField(max_length=255)
    email = models.EmailField()
    cel = models.CharField(max_length=255)
    ocup = models.FloatField()


# exercicio - model de curso 
tipos = [("CAI","CAI"), ("CT","CT"), ("CS","CS"), ("FIC","FIC")]
class CadastroCurso(models.Model):
    nomeCurso = models.TextField()
    tipo = models.CharField(choices=tipos, max_length=3, default="CT")
    horaAula = models.FloatField()
    siglaCurso = models.CharField(max_length=10)



# aqui seria uma ótima prática separar por pastas, mas como é um exercicio pequeno e para treino, quis deixar tudo junto
# exercicio - fazer o crud de disciplina
class CadastroDisciplina(models.Model):
    nome_completo = models.TextField()
    sigla = models.CharField(max_length=10)
    curso = models.ForeignKey(CadastroCurso, verbose_name="curso que essa disciplina faz parte", on_delete=models.CASCADE, default=1) # o curso será uma foreign key
    semestre = models.IntegerField()
    cargahoraria = models.FloatField()
