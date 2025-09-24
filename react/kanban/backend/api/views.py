from django.shortcuts import render, get_object_or_404
from .models import *
from .serializer import *
from rest_framework.generics import ListCreateAPIView, RetrieveDestroyAPIView
from rest_framework.response import Response
from rest_framework import status

# Create your views here.

# views que são responsáveis pelo get e post
class ColumnView(ListCreateAPIView):
    queryset = Columns.objects.all().order_by("order")
    serializer_class = ColumnSerializer

class TaskView(ListCreateAPIView):
    queryset = Tasks.objects.all().order_by("order")
    serializer_class = TaskSerializer

# views que são responsáveis pelo patch e delete
class ColumnRDV(RetrieveDestroyAPIView):
    queryset = Columns.objects.all()
    serializer_class = ColumnSerializer

    def patch(self, request, pk):
        column = get_object_or_404(Columns, id = pk)
        serializer = ColumnSerializer(column, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TaskRDV(RetrieveDestroyAPIView):
    queryset = Tasks.objects.all()
    serializer_class = TaskSerializer

    def patch(self, request, pk):
        task = get_object_or_404(Tasks, id = pk)
        serializer = TaskSerializer(task, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



