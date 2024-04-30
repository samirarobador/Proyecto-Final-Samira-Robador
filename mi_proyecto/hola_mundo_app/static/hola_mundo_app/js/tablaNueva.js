function verificarCambio() {
    fetch('/obtener_mensaje/')
    .then(response => response.json())
    .then(data => {
        const mensajeElement = document.getElementById('mensaje');
        if(mensajeElement.innerText === "Dispositivo no Conectado"){
        mensajeElement.innerText = data.mensaje;

        if(data.mensaje === "Dispositivo no Conectado"){
            mensajeElement.style.backgroundColor = '#e5502edf';
            mensajeElement.style.color = 'white';
        }else if(data.mensaje === "Dispositivo Conectado"){
            mensajeElement.style.backgroundColor = 'green';
            mensajeElement.style.color = 'white';
        }else{
            mensajeElement.style.backgroundColor = '#c678dcc6';
            mensajeElement.style.color = 'black';
        }

        mensajeElement.innerText = data.mensaje;
    }else{
        ping(data.mensaje);
    }
    })
    .catch(error => console.log('Error:', error));
}

setInterval(verificarCambio,3000);

function ping(ip){
    const requestOption = {
        method: "GET",
        redirect: "follow",
    }
    console.log("Hola gente "+ 'http://'+ip+':80/ping');
    
    fetch('http://'+ip+':80/ping', requestOption)
    .then((response)=> {
        console.log(response.status );
        if(response.status == 200){
            console.log("Todo sigue ok");
        }else{
            console.log("Desconectado");
            fetch("/recibir_mensaje/?mensaje=Dispositivo no Conectado");
            document.getElementById('mensaje').innerText = "Dispositivo no Conectado";
        }
    })
    .then((result)=>console.log(result))
    .catch((error)=>{
        
        console.log("Desconectado");
            fetch("/recibir_mensaje/?mensaje=Dispositivo no Conectado");
            document.getElementById('mensaje').innerText = "Dispositivo no Conectado";
    });

}


document.addEventListener('DOMContentLoaded', function () {
    const toggleBtn = document.getElementById('toggleListBtn');
    const listContainer = document.getElementById('buttonListContainer');
/*
    toggleBtn.addEventListener('click', function () {
        if (listContainer.style.display === "none") {
            listContainer.style.display = "block";
        } else {
            listContainer.style.display = "none";
        }
    });
    */
});


/*
document.getElementById('toggleListBtn').addEventListener('click', function() {
    if (confirm('¿Estás seguro de que quieres hacer esto?')) {
        // El usuario hizo clic en "Aceptar"
        console.log('El usuario dijo sí.');
        hacerAlgo();
    } else {
        // El usuario hizo clic en "Cancelar"
        console.log('El usuario dijo no.');
    }
});
*/

function mostrarConfirmacion() {
    document.getElementById('miConfirmacion').style.display = 'flex';
}

function confirmar() {
    console.log('El usuario dijo sí.');
    //hacerAlgo();
    let IP = document.getElementById('mensaje').innerText;
    console.log(IP);
    moverRobot(IP);
    moverRobotCoordenadas2(0.15, -0.05, 170/1000,0); 
    document.getElementById('miConfirmacion').style.display = 'none';
}

function cancelar() {
    console.log('El usuario dijo no.');
    // Código opcional a ejecutar si el usuario dice "No"
    document.getElementById('miConfirmacion').style.display = 'none';
}


function hacerAlgo() {

    let IP = document.getElementById('mensaje').innerText;

    if(IP === "Dispositivo no Conectado"){
        console.log("No conectado");
        mostrarNoConexion();
    }else{

    const buttons = document.querySelectorAll('.button.clicked');
    const resetButton = document.getElementById('resetButton');
    const cargaGradillaButton = document.getElementById('toggleListBtn');
    let index = 0; // Índice para seguir la pista del botón actual

    function processButton() {
        if (index < buttons.length) {
            const button = buttons[index];
            valores = button.id.split(';');
            q1 = parseFloat(valores[0]);
            px = parseFloat(valores[1]);

            console.log(button.id); // Muestra el ID del botón en la consola
            button.style.backgroundColor = '#0057b391'; // Cambia el color a azul claro
            button.style.transform = 'scale(2.2)'; // Aplica un efecto de zoom
            button.style.transition = 'transform 0.5s ease'; // Suaviza la transición del efecto de zoom

            // Espera 2 segundos antes de quitar la clase 'clicked' y restaurar el color y tamaño
            setTimeout(() => {
                button.classList.remove('clicked');
                button.style.backgroundColor = ''; // Restaura el color original
                button.style.removeProperty('transform'); // Elimina el estilo inline de transform
                button.style.removeProperty('transition'); 
                index++; // Incrementa el índice para procesar el siguiente botón

                const altura = document.getElementById("altura").value;


                moverRobotCoordenada(px, 0, altura/1000,q1);
                processButton(); // Llama recursivamente a la función para el siguiente botón
                bombaAgua();
            }, 2000); // 2000 milisegundos = 2 segundos
        } else {
            // Deshabilita el botón de reseteo y carga después de procesar todos los botones
            resetButton.disabled = true;
            cargaGradillaButton.disabled = true;
            resetButton.style.backgroundColor = "#d8684f"; // Rojo para inactivo
            resetButton.style.color = "#ccc"; // Texto claro para inactivo
            cargaGradillaButton.style.backgroundColor = "#d8684f";
            cargaGradillaButton.style.color = "#ccc";
        }
    }

    processButton(); // Comienza el procesamiento del primer botón
    }
}

function moverRobot(IP) {

    if(IP === "Dispositivo no Conectado"){
        console.log("No conectado");
        mostrarNoConexion();
    }else{

    var celdas = document.querySelectorAll('td');
    var hayCeldasPintadas = false;
    var cont = 0;
    var valores;
    var px;
    var py;
    var pz = document.getElementById('altura').value/1000.0;
    var index = 0;

    function iterar() {
        if (index < celdas.length) {
            var celda = celdas[index];

            if (celda.classList.contains('colored')) {
                 valores = celda.id.split(';');
                 px = parseFloat(valores[0]);
                 py = parseFloat(valores[1]);
                celda.classList.remove('colored');
                console.log("Moviendo a:");
                console.log(px);
                console.log(py);
                console.log(pz);
                moverRobotCoordenada(px, py, pz);
                hayCeldasPintadas = true;

                

                
                
                setTimeout(bombaAgua, 1000);
                index++; // Incrementar el índice para la siguiente iteración
                setTimeout(iterar, 4000); // Esperar 2 segundos antes de la próxima iteración

            } else {
                index++; // Si la celda no está coloreada, pasar a la siguiente
                iterar(); // Llamar a la función iterar sin esperar
            }
        }
    }

    iterar(); // Comenzar el bucle

}
}

function bombaAgua(){
    const num1 = document.getElementById("mililitros").value;
    console.log("Activando Bomba");
    if(num1 !== undefined) {
        activarBombaDeAgua(num1);
    }
}

function activarBombaDeAgua(ml){
    console.log("Moviendo la bomba");
    const myHeader = new Headers();
    myHeader.append("Content-Type","application/x-www-form-urlencoded");
    const tiempo = ml * 720.0 / 10.0;
    const urlencoded = new URLSearchParams();
    urlencoded.append("valor",String(tiempo));

    console.log("Tiempo: ");
    console.log(String(tiempo));
    const requestOption = {
        method : "POST",
        headers:myHeader,
        body: urlencoded,
        redirect:"follow"
    };
    let IP = document.getElementById('mensaje').innerText;
    let urlPegar = "http://"+IP+":80/bombaagua";
    console.log("Antes de fetch de bomba");
    console.log(urlPegar);
    if(IP === "Dispositivo no Conectado"){
        console.log("No se activa la bomba");
        document.getElementById("labelq1").innerText = "No se puede enviar al robot";
    }else{
        console.log("Entro a la bomba");
        console.log(urlPegar);
    fetch(urlPegar,requestOption)
    .then(response=>response.text())
    .then(result => console.log(result))
    .catch(error => console.error(error));
    }
}

function moverRobotCoordenada(px,py,pz){
   
    const url = `/parametrosArticulares/?px=${px}&py=${py}&pz=${pz}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {            
            console.log("Antes de llamar a mover robot parametros con coordenada");
            moverRobotParametros(data.q1, data.q2, data.q3, data.q4,15);
        })
        .catch(error => console.error('Error:', error));
}

function moverRobotParametros(q1,q2,q3,q4,tt){
    console.log("Moviendo el robot");
    const myHeader = new Headers();
    myHeader.append("Content-Type","application/x-www-form-urlencoded");
    
    const urlencoded = new URLSearchParams();
    urlencoded.append("q1",String(q1));
    urlencoded.append("q2",String(q2));
    urlencoded.append("q3",String(q3));
    urlencoded.append("q4",String(q4)); 
    
    urlencoded.append("tt",String(tt));


    const requestOption = {
        method : "POST",
        headers:myHeader,
        body: urlencoded,
        redirect:"follow"
    };
    let IP = document.getElementById('mensaje').innerText;
    let urlPegar = "http://"+IP+":80/todos";
    console.log("Antes de fetch pepe");
    console.log(urlPegar);
    if(IP === "Dispositivo no Conectado"){
        console.log("No se mueve");
    }else{
        console.log("Entro a moverse");
        console.log(urlPegar);
    fetch(urlPegar,requestOption)
    .then(response=>response.text())
    .then(result => console.log(result))
    .catch(error => console.error(error));
    }
}


function mostrarNoConexion() {
    document.getElementById('noConexion').style.display = 'flex'; // Muestra la ventana emergente
}

function cerrarNoConexion() {
    document.getElementById('noConexion').style.display = 'none'; // Oculta la ventana emergente
}


function reiniciar(){
    crearTabla();
}

function crearTabla() {
    var filas = document.getElementById('filas').value;
    var columnas = document.getElementById('columnas').value;
    var tablaDiv = document.getElementById('tabla');
    var tabla = '<table>';
    var paso = 0.021;
    var N = 6;
    for (var i = 0; i < filas; i++) {
        tabla += '<tr>';
        for (var j = 0; j < columnas; j++) {

            console.log(i, j);
            tabla += `<td id="${0.11 + (N - i - 1) * paso};${(N - j - 3) * paso}" onclick="pintarCelda(this)">------------</td>`;
        }
        tabla += '</tr>';
    }

    tabla += '</table>';
    console.log(tabla);
    tablaDiv.innerHTML = tabla;



 
    document.getElementById('toggleListBtn').disabled = false;

    document.getElementById('resetButton2').disabled = false;


    document.getElementById('toggleListBtn').style.backgroundColor = "#03680691";
    document.getElementById('toggleListBtn').style.color = "#ccc";

}

function pintarCelda(celda) {
    celda.classList.toggle('colored');
}

function mostrarCeldasPintadas() {
    var celdas = document.querySelectorAll('td');
    var hayCeldasPintadas = false;
    var cont = 0;
    celdas.forEach(function (celda, index) {
        if (celda.classList.contains('colored')) {
            //celdasPintadasInfo += celda.id.split('-') + ' ';
            cont++;
            hayCeldasPintadas = true;
        }
    });



    //document.getElementById('celdasPintadas').innerText = celdasPintadasInfo;
    //document.getElementById('btnMoverRobot').style.display = 'inline';
    moverRobotCoordenada(0.08, 0,document.getElementById('altura').value/1000.0);
}

function cambiarPagina() {
    console.log("cambiarPagina");
    window.location.href = '/inicio';
}

function purgarBomba(){
    document.getElementById('purgado').style.display = 'flex';
}


function confirmarPurgado() {
    console.log('El usuario dijo sí.');
    //hacerAlgo();
    let IP = document.getElementById('mensaje').innerText;
    console.log(IP);

    purgarBombaIniciar(IP);
    document.getElementById('purgado').style.display = 'none';
}


function moverRobotCoordenadas2(px,py,pz,q1){
   
    const url = `/parametrosArticulares/?px=${px}&py=${py}&pz=${pz}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {            
            console.log("Antes de llamar a mover robot parametros con coordenada");
            moverRobotParametros(data.q1, data.q2, data.q3, data.q4,15);
        })
        .catch(error => console.error('Error:', error));
}
function purgarBombaIniciar(IP){
    if(IP === "Dispositivo no Conectado"){
        console.log("No conectado");
       // mostrarPurgando();
        mostrarNoConexion();
    }else{
        mostrarPurgando();
    }
    }
    
    function mostrarPurgando() {
        moverRobotCoordenadas2(0.15, -0.05, 170/1000,0);
        document.getElementById('confirmacionPurgando').style.display = 'flex'; // Muestra la ventana emergente
    }

function comenzar() {
    document.getElementById('confirmacionPurgando').style.display = 'none'; // Oculta la ventana emergente
    document.getElementById('loadingSpinner').style.display = 'block'; // Muestra el spinner

    activarBomba().then(() => {
        document.getElementById('loadingSpinner').style.display = 'none'; // Oculta el spinner una vez que activarBomba() ha terminado
    }).catch(error => {
        console.error('Error al activar la bomba:', error);
        document.getElementById('loadingSpinner').style.display = 'none'; // Asegúrate de ocultar el spinner incluso si hay un error
    });
}

function activarBomba() {
    valor = 50;
    activarBombaDeAgua(valor);
    return new Promise((resolve, reject) => {
        // Simula una operación asincrónica, como una solicitud HTTP
        setTimeout(() => {
            resolve();
        }, valor * 720.0 / 10.0); // Simula un retraso de 3 segundos
    });
}


function cancelarPurgado() {
    console.log('El usuario dijo no.');
    // Código opcional a ejecutar si el usuario dice "No"
    document.getElementById('purgado').style.display = 'none';
}