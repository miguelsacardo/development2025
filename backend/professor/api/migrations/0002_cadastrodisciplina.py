# Generated by Django 5.1.5 on 2025-03-11 16:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='CadastroDisciplina',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome_completo', models.TextField()),
                ('sigla', models.CharField(max_length=10)),
                ('semestre', models.IntegerField()),
                ('cargahoraria', models.FloatField()),
            ],
        ),
    ]
