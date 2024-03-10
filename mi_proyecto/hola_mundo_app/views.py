from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import math

# Create your views here.

def index(request):
    print("Entre")
    return render(request, 'hola_mundo_app/index.html')

def configurar(request):
    print("Entre a Configurar")
    return render(request, 'hola_mundo_app/configurar.html')

def hola_mundo(request):
    return HttpResponse('Hola Mundo')

def sumar(request):
    try:
        num1 = float(request.GET.get('px',''))
        num2 = float(request.GET.get('py',''))
        num3 = float(request.GET.get('pz',''))
        suma = num1+num2+num3
        return JsonResponse({'resultado':suma})
    except ValueError:
        return JsonResponse({'error':'Por favr debe introducir 3 numeros'},status = 400)
    
def parametrosArticulares(request):
    try:
        L1 = 0.095
        L2 = 0.12
        L3 = 0.12
        L4 = 0.075
        px = float(request.GET.get('px',''))
        py = float(request.GET.get('py',''))
        pz = float(request.GET.get('pz','')) - L1
        #print("hola", px, py, pz)
        q1 = math.degrees(math.atan2(py, px))
        q3_radianes = math.pi - math.acos((pz*pz+(math.sqrt(px*px+py*py)-L4)**2-L2**2-L3**2)/(-2*L2*L3))
        q3 = math.degrees(q3_radianes)
        q2_radianes = math.atan2(pz,math.sqrt(px**2+py**2)-L4)-math.atan2(L3*math.sin(q3_radianes),L2+L3*math.cos(q3_radianes))
        q2 = math.degrees(q2_radianes)
        q4 = -(q3+q2)

        #print(q2_radianes,q3_radianes)
        return JsonResponse({'q1':q1, 'q2':q2, 'q3':q3, 'q4':q4},status = 200)
    except ValueError:
        return JsonResponse({'error':'Recuerde introducir los 3 valores necesarios'},status = 400)

ultimo_mensaje = "Dispositivo no conectado"
def recibir_mensaje(request):
    global ultimo_mensaje
    mensaje = request.GET.get('mensaje',"Dispositivo no conectado")
    ultimo_mensaje = mensaje
    return JsonResponse({'status': 'Mensaje recibido'})

def obtener_mensaje(request):
    return JsonResponse({'mensaje':ultimo_mensaje})