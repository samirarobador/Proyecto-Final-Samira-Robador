from django.urls import path

from . import views



urlpatterns = [
    path('inicio/', views.index, name='index'),
    
    path('', views.index, name='index'),
    path('tabla/', views.tabla, name='tabla'),
     path('gradilla/', views.gradilla, name='gradilla'),
    path('hola/', views.hola_mundo,name="Funcion de saludo"),
    path('suma/',views.sumar, name = "suma de enteros"),
    path('parametrosArticulares/',views.parametrosArticulares, name = "Parametros Articulares"),
    path('recibir_mensaje/', views.recibir_mensaje, name='recibir_mensaje'),
    path('obtener_mensaje/', views.obtener_mensaje, name='obtener_mensaje'),
    path('esperar/', views.esperar, name='esperar'),
]