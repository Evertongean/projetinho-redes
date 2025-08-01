from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Tarefa
from .serializers import TarefaSerializer

@api_view(['GET', 'POST'])
def lista_cria_tarefas(request):
    if request.method == 'GET':
        tarefas = Tarefa.objects.all().order_by('-criado_em')
        serializer = TarefaSerializer(tarefas, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = TarefaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)