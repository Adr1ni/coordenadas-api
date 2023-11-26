from rest_framework import serializers
from .models import Coordenadas

class CoordenadaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coordenadas
        fields = ['lat','lng']
