
function crearTabla() {
    var filas = document.getElementById('filas').value;
    var columnas = document.getElementById('columnas').value;
    var tablaDiv = document.getElementById('tabla');
    var tabla = '<table>';

    for (var i = 0; i < filas; i++) {
        tabla += '<tr>';
        for (var j = 0; j < columnas; j++) {
            
        console.log(i,j);
            tabla += `<td id="celda-${i}-${j}" onclick="pintarCelda(this)">celda-${i}-${j}</td>`;
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

    celdas.forEach(function(celda, index) {
        if(celda.classList.contains('colored')) {
            celdasPintadasInfo += celda.id + ' ';
            hayCeldasPintadas = true;
        }
    });

    if (!hayCeldasPintadas) {
        celdasPintadasInfo += 'Ninguna';
    }

    document.getElementById('celdasPintadas').innerText = celdasPintadasInfo;
}
