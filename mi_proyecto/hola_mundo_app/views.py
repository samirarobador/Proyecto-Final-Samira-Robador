from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.

def index(request):
    return render(request, 'hola_mundo_app/index.html')

def hola_mundo(request):
    return HttpResponse('Hola Mundo')


