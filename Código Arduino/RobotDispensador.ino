#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <ESP32Servo.h>
#include <HTTPClient.h>
#include <stdlib.h>
#include <math.h>
#include <stdio.h>

const char *ssid = "aquinombredered";
const char *password = "aquipassdered";

const int bombaPin = 25; // Pin al que está conectado Servo1

const int servoPin1 = 12; // Pin al que está conectado Servo1
const int servoPin2 = 14; // Pin al que está conectado Servo2
const int servoPin3 = 27; // Pin al que está conectado Servo3
const int servoPin4 = 26; // Pin al que está conectado Servo4

float q1Valor = 85;
float q2Valor = 160;
float q3Valor = 162;
float q4Valor = 87;

int maxServo = 2540;
int minServo = 440;


Servo servo1; // Declarar el objeto servo1
Servo servo2; // Declarar el objeto servo2
Servo servo3; // Declarar el objeto servo2
Servo servo4; // Declarar el objeto servo2
HTTPClient http;
AsyncWebServer server(80);

void moverGradualmenteServo(Servo &servo, float targetAngle) {
  float currentAngle = servo.read(); // Leer el ángulo actual del servo
  Serial.print("Valor actual del Servo: ");
  Serial.println(currentAngle);
  float step = (targetAngle > currentAngle) ? 1 : -1; // Determinar el paso de incremento o decremento

  // Mover gradualmente el servo hacia el ángulo deseado
  while (currentAngle != targetAngle) {
    currentAngle = currentAngle + step; // Incrementar o decrementar el ángulo actual
    servo.write(currentAngle); // Enviar el nuevo ángulo al servo
    delay(10); // Pequeña pausa para suavizar el movimiento (ajustar según necesites)
    Serial.print("Moviendo: ");
    Serial.println(currentAngle);

  }
}

void moverGradualmenteServos(Servo &servo1, Servo &servo2, Servo &servo3, Servo &servo4, float q1, float q2, float q3, float q4) {
  float q1Step = (q1 > q1Valor) ? 1 : -1; // Determinar el paso de incremento o decremento para servo1
  float q2Step = (q2 > q2Valor) ? 1 : -1; // Determinar el paso de incremento o decremento para servo2
  float q3Step = (q3 > q3Valor) ? 1 : -1; // Determinar el paso de incremento o decremento para servo3
  float q4Step = (q4 > q4Valor) ? 1 : -1; // Determinar el paso de incremento o decremento para servo4
  int tiempo = 9;
  int falta1 = (q1 - q1Valor);
  int falta2 = (q2 - q2Valor);
  int falta3 = (q3 - q3Valor);
  int falta4 = (q4 - q4Valor);

  Serial.printf("\nDel servo 1 falta %d\n", falta1);
  Serial.printf("\nDel servo 2 falta %d\n", falta2);
  Serial.printf("\nDel servo 3 falta %d\n", falta3);
  Serial.printf("\nDel servo 4 falta %d\n", falta4);

  // Determinar el número máximo de iteraciones basado en el servo que debe moverse más
  int maxIterations = max(abs(q1 - q1Valor), max(abs(q2 - q2Valor), max(abs(q3 - q3Valor), abs(q4 - q4Valor))));

  for (int i = 0; i < maxIterations; i++) {
    if (fabs(q1 - q1Valor) > 0.0001) {
      //servo1.write(q1Valor + q1Step); // Mover servo1 un grado
      servo1.writeMicroseconds(map(q1Valor + q1Step, 0, 180, minServo, maxServo));
      q1Valor += q1Step;
    }
    if (fabs(q2 - q2Valor) > 0.0001) {
      //servo2.write(q2Valor + q2Step); // Mover servo2 un grado
      servo2.writeMicroseconds(map(q2Valor + q2Step, 0, 180, minServo, maxServo));
      q2Valor += q2Step;
    }
    if (fabs(q3 - q3Valor) > 0.0001) {
      //servo3.write(q3Valor + q3Step); // Mover servo3 un grado
      servo3.writeMicroseconds(map(q3Valor + q3Step, 0, 180, minServo, maxServo));
      q3Valor += q3Step;
    }
    if (fabs(q4 - q4Valor) > 0.0001) {
      //servo4.write(q4Valor + q4Step); // Mover servo4 un grado
      servo4.writeMicroseconds(map(q4Valor + q4Step, 0, 180, minServo, maxServo));
      q4Valor += q4Step;
    }
    delay(tiempo); // Pequeña pausa para suavizar el movimiento (ajustar según necesites)
  }

  if(abs(falta1) > 0){
    for (int i = 0; i < 8; i++){
      q1Valor -= 1;
      servo1.writeMicroseconds(map(q1Valor, 0, 180, minServo, maxServo));
      delay(tiempo);
    }
  
     for (int i = 0; i < 8; i++){
      q1Valor += 1;
      servo1.writeMicroseconds(map(q1Valor, 0, 180, minServo, maxServo));
      delay(tiempo);
    }
  }

    if(abs(falta2) > 0){
    for (int i = 0; i < 8; i++){
      q2Valor += 1;
      servo2.writeMicroseconds(map(q2Valor, 0, 180, minServo, maxServo));
      delay(tiempo);
    }
  
     for (int i = 0; i < 8; i++){
      q2Valor -= 1;
      servo2.writeMicroseconds(map(q2Valor, 0, 180, minServo, maxServo));
      delay(tiempo);
    }
  }


    if(abs(falta3) > 0){
    for (int i = 0; i < 8; i++){
      q3Valor -= 1;
      servo3.writeMicroseconds(map(q3Valor, 0, 180, minServo, maxServo));
      delay(tiempo);
    }
  
     for (int i = 0; i < 8; i++){
      q3Valor += 1;
      servo3.writeMicroseconds(map(q3Valor, 0, 180, minServo, maxServo));
      delay(tiempo);
    }
  }


    if(abs(falta4) > 0){
    for (int i = 0; i < 10; i++){
      q4Valor += 1;
      servo4.writeMicroseconds(map(q4Valor, 0, 180, minServo, maxServo));
      delay(tiempo);
    }
  
     for (int i = 0; i < 10; i++){
      q4Valor -= 1;
      servo4.writeMicroseconds(map(q4Valor, 0, 180, minServo, maxServo));
      delay(tiempo);
    }
  }

}


void setup() {
  pinMode(bombaPin, OUTPUT);
  digitalWrite(bombaPin, LOW);
  Serial.begin(9600);
  // Conectar a la red WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Conectando a la red WiFi...");
  }
  Serial.println("Conexión exitosa a la red WiFi");

  // Imprimir la dirección IP asignada
  Serial.print("Dirección IP asignada: ");
  Serial.println(WiFi.localIP());

  String peticion = "http://192.168.0.161:8000/recibir_mensaje/?mensaje=" + WiFi.localIP().toString();

  Serial.println(peticion);

  http.begin(peticion.c_str());

  Serial.println(peticion);
  int httpCode = http.GET();

  Serial.println("Respuesta");

  Serial.println(httpCode);



  servo1.attach(servoPin1); // Inicializar servo1 en el pin especificado
  servo2.attach(servoPin2); // Inicializar servo2 en el pin especificado
  servo3.attach(servoPin3); // Inicializar servo3 en el pin especificado
  servo4.attach(servoPin4); // Inicializar servo4 en el pin especificado

  servo1.write(q1Valor);
  servo2.write(q2Valor);
  servo3.write(q3Valor);
  servo4.write(q4Valor);

  moverGradualmenteServos(servo1, servo2, servo3, servo4, q1Valor+5, q2Valor+5, q3Valor+5, q4Valor+5);




  server.on("/ping", HTTP_GET, [](AsyncWebServerRequest * request) {
    AsyncResponseStream *response = request->beginResponseStream("text/plain");
    response->addHeader("Access-Control-Allow-Origin", "*");
    response->print("pong");
    //Serial.println("Peticion GET recibida");
    request->send(response);
  });


  server.on("/espera", HTTP_GET, [](AsyncWebServerRequest * request) {
    AsyncResponseStream *response = request->beginResponseStream("text/plain");
    response->addHeader("Access-Control-Allow-Origin", "*");
    delay(1000);
    //Serial.println("Peticion GET recibida");
    request->send(response);
  });


  // Rutas y controladores para peticiones GET
  server.on("/", HTTP_GET, [](AsyncWebServerRequest * request) {
    //Serial.println("Peticion GET recibida");
    request->send(200, "text/plain", "Hola desde ESP32!");
  });

  // Rutas y controladores para peticiones POST
  server.on("/post", HTTP_POST, [](AsyncWebServerRequest * request) {
    //Serial.println("Peticion POST recibida");
    String message;
    if (request->hasParam("message", true)) {
      message = request->getParam("message", true)->value();
    }
    //Serial.println("Mensaje recibido: " + message);
    request->send(200, "text/plain", "Mensaje recibido: " + message);
  });

  // Rutas y controladores para peticiones POST
  server.on("/bombaagua", HTTP_POST, [](AsyncWebServerRequest * request) {
    //Serial.println("Peticion POST recibida para mover el Servo 1");
    if (request->hasParam("valor", true)) {
      String tiempo = request->getParam("valor", true)->value();
      float valor = atof(tiempo.c_str());
      Serial.println(valor);
      digitalWrite(bombaPin, HIGH);
      delay(valor);
      digitalWrite(bombaPin, LOW);
      request->send(200, "text/plain", "Bomba encendida" + tiempo + " milisegundos");
    } else {
      request->send(400, "text/plain", "Parámetro de tiempo (valor) faltante.");
    }

  });

  // Rutas y controladores para peticiones POST
  server.on("/servo1", HTTP_POST, [](AsyncWebServerRequest * request) {
    //Serial.println("Peticion POST recibida para mover el Servo 1");
    if (request->hasParam("valor", true)) {
      String angleStr = request->getParam("valor", true)->value();
      float valor = atof(angleStr.c_str());
      //Serial.println(valor);
      moverGradualmenteServo(servo1, valor);
      request->send(200, "text/plain", "Servo1 movido a " + angleStr + " grados.");
    } else {
      request->send(400, "text/plain", "Parámetro de ángulo faltante.");
    }
  });

  // Rutas y controladores para peticiones POST
  server.on("/servo2", HTTP_POST, [](AsyncWebServerRequest * request) {

    //Serial.println("Peticion POST recibida para mover el Servo 3");
    if (request->hasParam("valor", true)) {
      String angleStr = request->getParam("valor", true)->value();
      float valor = atof(angleStr.c_str());
      //Serial.println(valor);
      moverGradualmenteServo(servo2, valor);
      request->send(200, "text/plain", "Servo2 movido a " + angleStr + " grados.");
    } else {
      request->send(400, "text/plain", "Parámetro de ángulo faltante.");
    }
  });

  // Rutas y controladores para peticiones POST
  server.on("/servo3", HTTP_POST, [](AsyncWebServerRequest * request) {

    //Serial.println("Peticion POST recibida para mover el Servo 3");
    if (request->hasParam("valor", true)) {
      String angleStr = request->getParam("valor", true)->value();
      float valor = atof(angleStr.c_str());
      //Serial.println(valor);
      moverGradualmenteServo(servo3, valor);
      request->send(200, "text/plain", "Servo3 movido a " + angleStr + " grados.");
    } else {
      request->send(400, "text/plain", "Parámetro de ángulo faltante.");
    }
  });

  // Rutas y controladores para peticiones POST
  server.on("/servo4", HTTP_POST, [](AsyncWebServerRequest * request) {

    //Serial.println("Peticion POST recibida para mover el Servo 4");
    if (request->hasParam("valor", true)) {
      String angleStr = request->getParam("valor", true)->value();
      float valor = atof(angleStr.c_str());
      //Serial.println(valor);
      moverGradualmenteServo(servo4, valor);
      request->send(200, "text/plain", "Servo4 movido a " + angleStr + " grados.");
    } else {
      request->send(400, "text/plain", "Parámetro de ángulo faltante.");
    }
  });
  server.begin();


  // Rutas y controladores para peticiones POST
  server.on("/todos", HTTP_POST, [](AsyncWebServerRequest * request) {

    //Serial.println("Peticion POST recibida para mover el Servo 4");
    if (request->hasParam("q1", true) && request->hasParam("q2", true) && request->hasParam("q3", true) && request->hasParam("q4", true)) {
      String angleStr1 = request->getParam("q1", true)->value();
      String angleStr2 = request->getParam("q2", true)->value();
      String angleStr3 = request->getParam("q3", true)->value();
      String angleStr4 = request->getParam("q4", true)->value();
      Serial.println(angleStr3);
      float q1 = atof(angleStr1.c_str());
      float q2 = atof(angleStr2.c_str());
      float q3 = atof(angleStr3.c_str());
      float q4 = atof(angleStr4.c_str());

      Serial.print(q1, 6);
      Serial.println("");
      Serial.print(q2, 6);
      Serial.println("");
      Serial.print(q3, 6);
      Serial.println("");
      Serial.print(q4, 6);
      Serial.println("");
      /*moverGradualmenteServo(servo1, q1+90);
        moverGradualmenteServo(servo2, q2+30);
        moverGradualmenteServo(servo3, 120-q3);
        moverGradualmenteServo(servo4, -(q2-90+q3));
      */

      moverGradualmenteServos(servo1, servo2, servo3, servo4, q1 + 45, q2 + 30, 30 - q3, -(q2 - 90 + q3));

      request->send(200, "text/plain", "Todas las articulaciones movidas");
    } else {
      request->send(400, "text/plain", "Falta algún parametro");
    }
  });
  server.begin();
}



void loop() {
}
