from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
# Create your views here.

def index(request):
    print("Entre")
    return render(request, 'hola_mundo_app/index.html')

def hola_mundo(request):
    return HttpResponse('Hola Mundo')

def sumar(request):
    try:
        num1 = int(request.GET.get('num1',''))
        num2 = int(request.GET.get('num2',''))
        num3 = int(request.GET.get('num3',''))
        suma = num1+num2+num3
        return JsonResponse({'resultado':suma})
    except ValueError:
        return JsonResponse({'error':'Por favr debe introducir 3 numeros'},status = 400)
