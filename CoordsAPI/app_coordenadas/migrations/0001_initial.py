# Generated by Django 4.1.13 on 2023-11-23 15:19

from django.db import migrations, models
import djongo.models.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Coordenadas',
            fields=[
                ('_id', djongo.models.fields.ObjectIdField(auto_created=True, primary_key=True, serialize=False)),
                ('lat', models.DecimalField(decimal_places=15, max_digits=100)),
                ('lng', models.DecimalField(decimal_places=15, max_digits=100)),
            ],
        ),
    ]
