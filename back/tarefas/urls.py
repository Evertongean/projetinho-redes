from django.urls import path
from . import views

urlpatterns = [
    path('tarefas/', views.lista_cria_tarefas, name='lista_cria_tarefas'),
]