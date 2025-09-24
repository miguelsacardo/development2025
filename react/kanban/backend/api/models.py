from django.db import models

# Create your models here.
class Columns(models.Model):
    id = models.CharField(max_length=15, primary_key=True)
    title = models.CharField(max_length=100)
    order = models.IntegerField()

class Tasks(models.Model):
    id = models.CharField(max_length=15, primary_key=True)
    columnId = models.ForeignKey(Columns, on_delete=models.CASCADE)
    content = models.CharField(max_length=100)
    order = models.IntegerField()