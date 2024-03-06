// static/hola_mundo_app/js/script.js
let var1 = "valor1";
let var2 = "valor2";
let var3 = "valor3";

let url = `http://localhost:8000/parametrosArticulares?px=${var1}&py=${var2}&pz=${var3}`;
fetch(url)
        .then(response => {response.json();
        console.log("Por aqui");})
        .then(data => {
            console.log("Estoy");
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
        .catch(error => {
            console.error("hola")
        });

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