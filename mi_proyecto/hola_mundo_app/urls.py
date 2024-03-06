from django.urls import path

from . import views



urlpatterns = [
    path('', views.index, name='index'),
    path('hola/', views.hola_mundo,name="Funcion de saludo"),
    path('suma/',views.sumar, name = "suma de enteros"),
    path('parametrosArticulares/',views.parametrosArticulares, name = "Parametros Articulares"),
    path('mostrar-texto/', views.mostrar_texto, name='mostrar-texto'),
]