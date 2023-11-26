from . import views
from django.urls import path

app_name = 'coordenadas'

urlpatterns = [
    path('coords/', views.CoordenadasView.as_view(), name='coordenadas'),
    
    path('', views.index, name='index'),   # ESTO ES DE PRUBA
]