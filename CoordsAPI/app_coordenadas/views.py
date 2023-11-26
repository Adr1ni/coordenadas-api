from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializer import *
from .models import *

# Create your views here.

class CoordenadasView(APIView):
    def get(self, request):
        dataCoordenadas = Coordenadas.objects.all()
        dataCoordenadas = CoordenadaSerializer(dataCoordenadas, many=True)
        return Response(dataCoordenadas.data)
        
    def post(self, request):
        dataCoordenadas = CoordenadaSerializer(data=request.data)
        dataCoordenadas.is_valid(raise_exception=True)
        dataCoordenadas.save()
        return Response(dataCoordenadas.data)


# ESTO ES DE PRUEBA
def index(request):
    return render(request,'index.html')