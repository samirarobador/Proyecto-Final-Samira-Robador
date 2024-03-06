// static/hola_mundo_app/js/script.js
function verificarCambio() {
    fetch('/mostrar-texto/')
    .then(response => response.json())
    .then(data => {
        document.getElementById('texto-actualizado').innerText = data.texto;
    })
    .catch(error => console.log('Error:', error));
}

// Verifica si hay cambios cada 5 segundos
setInterval(verificarCambio, 5000);

document.getElementById("parametrosBtn").onclick = function() {
    const num1 = document.getElementById("px").value;
    const num2 = document.getElementById("py").value;
    const num3 = document.getElementById("pz").value;
    const url = `/parametrosArticulares/?px=${num1}&py=${num2}&pz=${num3}`;

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
        })
        .catch(error => console.error('Error:', error));
};