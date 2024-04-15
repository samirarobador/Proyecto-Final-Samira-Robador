# Arduino Configuration for Robotic Arm

Este repositorio contiene el archivo de configuración `.ino` para la manipulación de un brazo robótico. Este script en particular se encarga de configurar y manejar el brazo robótico, conectarlo a la red Wi-Fi, y ajustar parámetros esenciales para su operación.

## Contenido del Repositorio

- **RoboticArm.ino**: Archivo principal que contiene todo el código necesario para la configuración inicial del brazo robótico, la conexión Wi-Fi y la manipulación de sus articulaciones.

## Requisitos

Para utilizar este archivo, necesitarás:

- **Arduino IDE**: Para cargar el código al microcontrolador.
- **Módulo ESP32**: Este código está diseñado para microcontroladores ESP32.

## Instalación

1. Descarga e instala el Arduino IDE desde [la página oficial de Arduino](https://www.arduino.cc/en/software).
2. Clona este repositorio en tu computadora local o descarga el archivo `RobotDispensador.ino` directamente.
3. Abre el archivo `RobotDispensador.ino` con Arduino IDE.
4. Conecta tu módulo ESP32 a tu computadora mediante un cable USB.
5. Selecciona el modelo correcto de tu ESP32 en el menú de Herramientas > Placa de Arduino IDE.
6. Compila y sube el código al ESP32 seleccionando "Subir" en el Arduino IDE.

## Configuración de Wi-Fi

El archivo `RobotDispensador.ino` contiene secciones claramente marcadas para configurar tu red Wi-Fi. Asegúrate de actualizar las siguientes líneas con tus datos de acceso a Wi-Fi:

```c++
const char* ssid = "TU_SSID";
const char* password = "TU_CONTRASEÑA";
