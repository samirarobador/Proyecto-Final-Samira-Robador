// static/hola_mundo_app/js/script.js
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




document.getElementById("parametrosBtn").onclick = function() {
    const num1 = document.getElementById("px").value;
    const num2 = document.getElementById("py").value;
    const num3 = document.getElementById("pz").value;
    const url = `/parametrosArticulares/?px=${num1}&py=${num2}&pz=${num3}`;
    console.log("Holaaaaaaas en mover");
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if(data.q1 !== undefined) {
                document.getElementById("labelq1").innerText = "q1: " + data.q1;
            } else {
                document.getElementById("labelq1").innerText = "Error: " + data.error;
            }
            if(data.q2 !== undefined) {
                document.getElementById("labelq2").innerText = "q2: " + data.q2;
            } else {
                document.getElementById("labelq2").innerText = "Error: " + data.error;
            }
            if(data.q3 !== undefined) {
                document.getElementById("labelq3").innerText = "q3: " + data.q3;
            } else {
                document.getElementById("labelq3").innerText = "Error: " + data.error;
            }
            if(data.q4 !== undefined) {
                document.getElementById("labelq4").innerText = "q4: " + data.q4;
            } else {
                document.getElementById("labelq4").innerText = "Error: " + data.error;
            }
            console.log("Antes de llamar a mover robot parametros");
            moverRobot(data.q1, data.q2, data.q3, data.q4);
        })
        .catch(error => console.error('Error:', error));
};

document.getElementById("btnBombaAgua").onclick = function() {
    const num1 = document.getElementById("mililitros").value;
    console.log("Activando Bomba");
    if(num1 !== undefined) {
        activarBombaDeAgua(num1);
    } else {
        document.getElementById("labelq1").innerText = "Error: No se cargo correctamente los mililitros";
    }
};

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

document.getElementById("configBtn").onclick = function() {
    const q1 = document.getElementById("q1").value;
    const q2 = document.getElementById("q2").value;
    const q3 = document.getElementById("q3").value;
    const q4 = document.getElementById("q4").value;
    console.log("Entre a Config");
    
    if(q1 !== undefined) {
        document.getElementById("label2q1").innerText = "q1: " + q1;
    } else {
        document.getElementById("label2q1").innerText = "Se debe ingresar el parámetro q1";
    }
    if(q2 !== undefined) {
        document.getElementById("label2q1").innerText = "q2: " + q2;
    } else {
        document.getElementById("label2q1").innerText = "Se debe ingresar el parámetro q2";
    }
    if(q3 !== undefined) {
        document.getElementById("label2q1").innerText = "q3: " + q3;
    } else {
        document.getElementById("label2q1").innerText = "Se debe ingresar el parámetro q3";
    }
    if(q4 !== undefined) {
        document.getElementById("label2q4").innerText = "q4: " + q4;
        console.log("Antes de llamar a mover robot parametros");
        moverRobot(q1, q2, q3, q4);
    } else {
        document.getElementById("label2q4").innerText = "Se debe ingresar el parámetro q4";
    }

        
};

function moverRobot(q1,q2,q3,q4){
    console.log("Moviendo el robot");
    const myHeader = new Headers();
    myHeader.append("Content-Type","application/x-www-form-urlencoded");
    console.log(q1);
    const urlencoded = new URLSearchParams();
    urlencoded.append("q1",String(q1));
    urlencoded.append("q2",String(q2));
    urlencoded.append("q3",String(q3));
    urlencoded.append("q4",String(q4)); 

    console.log("q3: ");
    console.log(String(q3));
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
        document.getElementById("labelq1").innerText = "No se puede enviar al robot";
    }else{
        console.log("Entro a moverse");
        console.log(urlPegar);
    fetch(urlPegar,requestOption)
    .then(response=>response.text())
    .then(result => console.log(result))
    .catch(error => console.error(error));
    }
}

