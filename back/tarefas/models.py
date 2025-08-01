from django.db import models

class Tarefa(models.Model):
    titulo = models.CharField(max_length=200, verbose_name="Título")
    descricao = models.TextField(blank=True, null=True, verbose_name="Descrição")
    criado_em = models.DateTimeField(auto_now_add=True, verbose_name="Criado em")

    def __str__(self):
        return self.titulo

    class Meta:
        verbose_name = "Tarefa"
        verbose_name_plural = "Tarefas"