from rest_framework import serializers
from .models import *

class ColumnSerializer(serializers.ModelSerializer):
    class Meta:
        model = Columns
        many = True
        fields = '__all__'

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tasks
        many = True
        fields = '__all__'