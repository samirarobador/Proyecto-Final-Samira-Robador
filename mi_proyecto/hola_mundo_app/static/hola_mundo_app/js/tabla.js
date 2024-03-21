function verificarCambio() {
    fetch('/obtener_mensaje/')
    .then(response => response.json())
    .then(data => {
        const mensajeElement = document.getElementById('mensaje');
        if(mensajeElement.innerText === "Dispositivo no Conectado"){
        mensajeElement.innerText = data.mensaje;

        if(data.mensaje === "Dispositivo no Conectado"){
            mensajeElement.style.backgroundColor = 'red';
            mensajeElement.style.color = 'white';
        }else if(data.mensaje === "Dispositivo Conectado"){
            mensajeElement.style.backgroundColor = 'green';
            mensajeElement.style.color = 'white';
        }else{
            mensajeElement.style.backgroundColor = 'transparent';
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


function crearTabla() {
    var filas = document.getElementById('filas').value;
    var columnas = document.getElementById('columnas').value;
    var tablaDiv = document.getElementById('tabla');
    var tabla = '<table>';
    var paso = 0.0215;
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

    document.getElementById('btnCeldasPintadas').style.display = 'inline';
}

function pintarCelda(celda) {
    celda.classList.toggle('colored');
}

function mostrarCeldasPintadas() {
    var celdas = document.querySelectorAll('td');
    var celdasPintadasInfo = 'Celdas Pintadas: ';
    var hayCeldasPintadas = false;
    var cont = 0;
    celdas.forEach(function (celda, index) {
        if (celda.classList.contains('colored')) {
            //celdasPintadasInfo += celda.id.split('-') + ' ';
            cont++;
            hayCeldasPintadas = true;
        }
    });

    if (!hayCeldasPintadas) {
        celdasPintadasInfo += 'Ninguna';
    } else {
        celdasPintadasInfo += cont;
    }

    document.getElementById('celdasPintadas').innerText = celdasPintadasInfo;
    document.getElementById('btnMoverRobot').style.display = 'inline';
    moverRobotCoordenada(0.08, 0,document.getElementById('altura').value/1000.0);
}


function moverRobot() {
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
            moverRobotParametros(data.q1, data.q2, data.q3, data.q4);
        })
        .catch(error => console.error('Error:', error));
}

function moverRobotParametros(q1,q2,q3,q4){
    console.log("Moviendo el robot");
    const myHeader = new Headers();
    myHeader.append("Content-Type","application/x-www-form-urlencoded");
    
    const urlencoded = new URLSearchParams();
    urlencoded.append("q1",String(q1));
    urlencoded.append("q2",String(q2));
    urlencoded.append("q3",String(q3));
    urlencoded.append("q4",String(q4)); 


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

