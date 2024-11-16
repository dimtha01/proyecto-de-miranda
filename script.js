// Array para almacenar los participantes
let participantes = [];
let ganador = null;
// Boton detener inactivo si no se ha iniciado el triatlon
const botonDetener = document.getElementById('button_detener_o_reanudar_triatlon');
botonDetener.disabled = true;

// Función para validar la cédula
function validarCedula(cedula) {
    // Verificar que la cédula tenga el formato correcto (V-número)
    const regex = /^V-\d{7,8}$/;
    return regex.test(cedula);
}

// Función para validar el nombre
function validarNombre(nombre) {
    // Verificar que el nombre tenga al menos 2 palabras y solo letras
    const palabras = nombre.trim().split(/\s+/);
    const regex = /^[A-Za-záéíóúñÁÉÍÓÚÑ\s]+$/;
    return palabras.length >= 2 && regex.test(nombre);
}

// Función para validar la edad
function validarEdad(edad) {
    // Verificar que la edad sea un número entre 18 y 100
    return !isNaN(edad) && edad >= 18 && edad <= 100;
}

// Función para validar el municipio
function validarMunicipio(municipio) {
    // Verificar que el municipio solo contenga letras y espacios
    const regex = /^[A-Za-záéíóúñÁÉÍÓÚÑ\s]+$/;
    return regex.test(municipio) && municipio.trim().length > 0;
}

// Función para agregar participante a la tabla
function agregarParticipanteTabla(participante) {
    const tbody = document.getElementById('participantesTableBody');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>
            <div class="form-check">
                <input class="form-check-input participante-checkbox" type="checkbox" value="${participante.cedula}">
            </div>
        </td>
        <td>${participante.cedula}</td>
        <td>${participante.nombre}</td>
        <td>${participante.edad}</td>
        <td>${participante.municipio}</td>
    `;

    tbody.appendChild(row);
}

// Función para limpiar el formulario
function limpiarFormulario() {
    document.getElementById('cedula').value = '';
    document.getElementById('nombre').value = '';
    document.getElementById('municipio').value = '';
    document.getElementById('edad').value = '';
}

// Función principal para registrar participante
function registrarParticipante() {
    // Obtener valores del formulario
    const cedula = document.getElementById('cedula').value.trim();
    const nombre = document.getElementById('nombre').value.trim();
    const municipio = document.getElementById('municipio').value.trim();
    const edad = parseInt(document.getElementById('edad').value);

    // Validar campos
    let mensajesError = [];

    if (!validarCedula(cedula)) {
        mensajesError.push("La cédula debe tener el formato V-xxxxxxx");
    }

    if (!validarNombre(nombre)) {
        mensajesError.push("El nombre debe contener al menos nombres y apellidos (solo letras)");
    }

    if (!validarEdad(edad)) {
        mensajesError.push("La edad debe estar entre 18 y 100 años");
    }

    if (!validarMunicipio(municipio)) {
        mensajesError.push("El municipio debe contener solo letras");
    }

    // Verificar si la cédula ya está registrada
    if (participantes.some(p => p.cedula === cedula)) {
        mensajesError.push("Esta cédula ya está registrada");
    }

    // Si hay errores, mostrarlos y detener el registro
    if (mensajesError.length > 0) {
        alert(mensajesError.join('\n'));
        return;
    }

    // Crear objeto participante
    const participante = {
        cedula,
        nombre,
        municipio,
        edad
    };

    // Agregar al array de participantes
    participantes.push(participante);

    // Agregar a la tabla
    agregarParticipanteTabla(participante);

    // Limpiar formulario
    limpiarFormulario();

    // Mostrar mensaje de éxito
    alert('Participante registrado exitosamente');
}

// Función para generar datos aleatorios
function generarDatosAleatorios() {
    const nombres = [
        "Ana", "Juan", "Luis", "María", "Pedro", "Carlos", "Diana", "Miguel",
        "Laura", "José", "Carmen", "Francisco", "Isabel", "Antonio", "Sofía",
        "Alberto", "Victoria", "Fernando", "Elena", "Roberto", "Patricia", "Ricardo",
        "Mónica", "Gabriel", "Valentina", "Leonardo", "Carolina", "Eduardo", "Andrea"
    ];

    const apellidos = [
        "Pérez", "González", "Rodríguez", "López", "Martínez", "Sánchez", "Fernández",
        "García", "Torres", "Díaz", "Hernández", "Vargas", "Morales", "Castro", "Ortiz",
        "Jiménez", "Silva", "Romero", "Ramírez", "Flores", "Ruiz", "Mendoza", "Álvarez",
        "Navarro", "Molina", "Rojas", "Medina", "Suárez", "Mejía", "Delgado"
    ];

    const municipios = [
        "Libertador", "Chacao", "Sucre", "Baruta", "El Hatillo", "Los Salias",
        "Carrizal", "Guaicaipuro", "Plaza", "Zamora", "Acevedo", "Brión", "Buroz",
        "Independencia", "Paz Castillo", "Pedro Gual", "Simón Bolívar", "Urdaneta",
        "Cristóbal Rojas", "Los Salias", "Andrés Bello", "Guaicaipuro", "Lander"
    ];

    // Función para generar un participante aleatorio único
    function generarParticipanteUnico() {
        const nombre = `${nombres[Math.floor(Math.random() * nombres.length)]} ${
            apellidos[Math.floor(Math.random() * apellidos.length)]}`;

        const cedula = "V-" + (Math.floor(Math.random() * 90000000) + 10000000);
        const municipio = municipios[Math.floor(Math.random() * municipios.length)];
        const edad = Math.floor(Math.random() * (60 - 18 + 1)) + 18;

        return {
            nombre,
            cedula,
            municipio,
            edad
        };
    }

    // Generar entre 15 y 25 participantes aleatorios
    const cantidadParticipantes = Math.floor(Math.random() * (25 - 15 + 1)) + 15;
    const cedulasUsadas = new Set(); // Para evitar cédulas duplicadas

    // Limpiar la tabla actual
    document.getElementById('participantesTableBody').innerHTML = '';
    participantes = []; // Limpiar el array de confirmados

    // Generar y agregar participantes
    for (let i = 0; i < cantidadParticipantes; i++) {
        let participante;
        do {
            participante = generarParticipanteUnico();
        } while (cedulasUsadas.has(participante.cedula));

        cedulasUsadas.add(participante.cedula);
        participantes.push(participante);

        // Agregar directamente a la tabla
        const tbody = document.getElementById('participantesTableBody');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div class="form-check">
                    <input class="form-check-input participante-checkbox" type="checkbox" value="${participante.cedula}">
                </div>
            </td>
            <td>${participante.cedula}</td>
            <td>${participante.nombre}</td>
            <td>${participante.edad}</td>
            <td>${participante.municipio}</td>
        `;
        tbody.appendChild(row);
    }


}


// Función para eliminar participantes seleccionados
function eliminarSeleccionados() {
    const checkboxes = document.querySelectorAll('.participante-checkbox:checked');
    if (checkboxes.length === 0) {
        alert('No hay participantes seleccionados para eliminar');
        return;
    }

    if (confirm('¿Está seguro de eliminar los participantes seleccionados?')) {
        checkboxes.forEach(checkbox => {
            const cedula = checkbox.value;
            // Eliminar del array
            participantes = participantes.filter(p => p.cedula !== cedula);
            // Eliminar la fila de la tabla
            checkbox.closest('tr').remove();
        });
        // Desmarcar el checkbox "Seleccionar todos"
        document.getElementById('selectAll').checked = false;
    }
}

// Evento para el checkbox "Seleccionar todos"
document.getElementById('selectAll').addEventListener('change', function() {
    const checkboxes = document.querySelectorAll('.participante-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.checked = this.checked;
    });
});

// Asignar las funciones a los botones
document.getElementById('btnRegistrar').onclick = registrarParticipante;
document.getElementById('generarDatos').onclick = generarDatosAleatorios;
document.getElementById('eliminarSeleccionados').onclick = eliminarSeleccionados;




let time = 1;//tiempo en segundos para actualizar tabla
let interval = null;

let intervalTiempo = null;
let segundos = 0;

const confirmados = [
    { nombre: "Ana Pérez", municipio: "Libertador", cedula: "V-12345678", edad: 25 },
    { nombre: "Carlos Ruiz", municipio: "Chacao", cedula: "V-23456789", edad: 30 },
    { nombre: "María García", municipio: "Sucre", cedula: "V-34567890", edad: 28 },
    { nombre: "Luis Rodríguez", municipio: "Baruta", cedula: "V-45678901", edad: 32 },
    { nombre: "Patricia Hernández", municipio: "El Hatillo", cedula: "V-56789012", edad: 27 },
    { nombre: "José Ramírez", municipio: "Iribarren", cedula: "V-67890123", edad: 35 },
    { nombre: "Carmen Torres", municipio: "Caroní", cedula: "V-78901234", edad: 29 },
    { nombre: "Miguel Fernández", municipio: "San Francisco", cedula: "V-89012345", edad: 40 },
    { nombre: "Lucía Morales", municipio: "Girardot", cedula: "V-90123456", edad: 33 },
    { nombre: "Antonio Romero", municipio: "Naguanagua", cedula: "V-11234567", edad: 45 },
    { nombre: "Verónica Ortiz", municipio: "Los Guayos", cedula: "V-22345678", edad: 26 },
    { nombre: "Francisco Jiménez", municipio: "Valencia", cedula: "V-33456789", edad: 34 },
    { nombre: "Sofía Mendoza", municipio: "Simón Bolívar", cedula: "V-44567890", edad: 31 },
    { nombre: "Raúl Márquez", municipio: "Maturín", cedula: "V-55678901", edad: 29 },
    { nombre: "Elena Castro", municipio: "Torres", cedula: "V-66789012", edad: 37 },
    { nombre: "Pedro León", municipio: "Guaicaipuro", cedula: "V-77890123", edad: 42 },
    { nombre: "Gabriela Silva", municipio: "Páez", cedula: "V-88901234", edad: 36 },
    { nombre: "Ramón Vargas", municipio: "Miranda", cedula: "V-99012345", edad: 48 },
    { nombre: "Liliana Rojas", municipio: "Bermúdez", cedula: "V-10123456", edad: 27 },
    { nombre: "Jorge Espinoza", municipio: "Urdaneta", cedula: "V-21134567", edad: 39 }
];

let participantes_actual;
let caminata;
let natacion;
let ciclismo;
let disciplina_actual;
let finalizado;

function formatearTiempo(segundos) {
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const seg = segundos % 60;

    return String(horas).padStart(2, '0') + ":" + String(minutos).padStart(2, '0') + ":" + String(seg).padStart(2, '0');
}

function iniciarCronometro() {
    if (!intervalTiempo) {
        intervalTiempo = setInterval(
            () => {
                segundos += 2;
                document.getElementById("tiempo").textContent = formatearTiempo(segundos);
            },
            17
        );
    }
}
function inicialMayuscula(cadena) {
    if (cadena.length === 0) return '';  // Si la cadena está vacía, devolver vacío ... python => String.capitalize() ...
    return cadena.charAt(0).toUpperCase() + cadena.slice(1).toLowerCase();
}

function crear_tabla(id_div) {
    let table = document.getElementById(id_div);
    table.innerHTML = `
        <h1>Disciplina ${inicialMayuscula(id_div)}</h1>
        <table class="table table">
            <thead>
                <tr class="table-dark text-white">
                    <th>#</th>
                    <th>Cédula</th>
                    <th>Nombre</th>
                    <th>Edad</th>
                    <th>Municipio</th>
                    <th>Hora inicio</th>
                    <th>Hora fin</th>
                    <th>Recorrido (km)</th>
                    <th>Tiempo</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    `;
}

function actualizarTablaTbody(id_div, participantes) {
    let div = document.getElementById(id_div);
    let table = div.querySelector("table");
    let tbody = table.querySelector("tbody");
    tbody.innerHTML = ``;
    participantes.forEach(
        (participante, index) => {
            let clase = participante.descalificado ? "table-danger": "";

            tbody.innerHTML += `
                <tr class="${clase}">
                    <td>${index + 1}</td>
                    <td>${participante.cedula}</td>
                    <td>${participante.nombre}</td>
                    <td>${participante.edad}</td>
                    <td>${participante.municipio}</td>
                    <td>${participante.hora_inicio}</td>
                    <td>${participante.hora_fin}</td>
                    <td>${parseFloat(participante.recorrido.toFixed(2))}</td>
                    <td>${participante.tiempo}</td>
                </tr>
            `;
        }
    );
}

function cancelarCronometro() {
    // Detener los intervalos
    clearInterval(interval);
    clearInterval(intervalTiempo);
    interval = null;
    cronometroInterval = null;
    finalizado = false;
    let buttonIniciar = document.getElementById("button_iniciar_triatlon");
    buttonIniciar.disabled = false
    document.getElementById('selectAll').checked = false;



    // Reiniciar variables del cronómetro
    cronometroMilliseconds = 0;
    cronometroSeconds = 0;
    cronometroMinutes = 0;
    cronometroHours = 0;
    elapsedMilliseconds = 0;

    // Actualizar display del cronómetro
    document.getElementById('tiempo').textContent = '00:00:00';

    // Ocultar o limpiar las tablas
    document.getElementById('caminata').innerHTML = '';
    document.getElementById('natación').innerHTML = '';
    document.getElementById('ciclismo').innerHTML = '';
}

function detener_reanudar_triatlon() {
    let buttonDetenerReanudar = document.getElementById("button_detener_o_reanudar_triatlon");
    if (buttonDetenerReanudar.textContent === "Detener") {
        buttonDetenerReanudar.textContent = "Reanudar";
        clearInterval(intervalTiempo);
        clearInterval(interval);
        intervalTiempo = null;
        interval = null;
    } else {
        buttonDetenerReanudar.textContent = "Detener";
        iniciarCronometro();
        interval = setInterval(main, time*1000);
    }
}

function iniciar_triatlon() {
    //Desactivamos el button que inicia el triatlon
    const participantesSeleccionados = document.querySelectorAll('#participantesTableBody input[type="checkbox"]:checked');

    // Verificar si hay participantes seleccionados
    if (participantesSeleccionados.length === 0) {
        console.log("dddd")
        // Mostrar alerta si no hay participantes seleccionados
        alert('Debe seleccionar al menos un participante para iniciar el triatlón');
        return; // Detener la ejecución
    }

    const botonDetener = document.getElementById('button_detener_o_reanudar_triatlon');
    botonDetener.disabled = true;

    finalizado = false;
    document.getElementById("caminata").innerHTML = "";
    document.getElementById("natación").innerHTML = "";
    document.getElementById("ciclismo").innerHTML = "";
    let buttonIniciar = document.getElementById("button_iniciar_triatlon");
    let buttonReiniciar = document.getElementById("button_reiniciar_triatlon");
    let buttonDetenerReanudar = document.getElementById("button_detener_o_reanudar_triatlon");
    buttonDetenerReanudar.textContent = "Detener";
    buttonIniciar.disabled = true;
    buttonReiniciar.disabled = false;
    buttonDetenerReanudar.disabled = false;

    //Estados por defecto
    segundos = 0;
    disciplina_actual = "caminata";
    const seleccionados = Array.from(document.querySelectorAll('#participantesTableBody input[type="checkbox"]:checked')).map(checkbox => {
        const fila = checkbox.closest('tr');
        return {
            cedula: fila.cells[1].textContent,
            nombre: fila.cells[2].textContent,
            edad: fila.cells[3].textContent,
            municipio: fila.cells[4].textContent
        };
    });

    // Ahora aplica la transformación solo a los participantes seleccionados
    caminata = seleccionados.map(participante => ({
        ...participante,
        hora_inicio: "00:00:00",
        hora_fin: "00:00:00",
        recorrido: 0,
        tiempo: "00:00:00",
        tiempo_seg_inicio: 0,
        tiempo_seg_fin: 0,
        tiempo_seg_dif: 0,
        descalificado: false
    }));
    natacion = []
    ciclismo = []
    //Verificamos si los intervalos ya estan inicializados
    if (interval) {
        clearInterval(interval);
        interval = null;
    }
    if (intervalTiempo) {
        clearInterval(intervalTiempo);
        intervalTiempo = null;
    }
    //Aplicamos el corrido del cronometro y la actualización de tabla por disciplina
    participantes_actual = caminata;
    crear_tabla(disciplina_actual);
    interval = setInterval(function () { main(); iniciarCronometro(); }, time*1000);

}

function isFinalize(recorrido, participantes) {
    let n = participantes.length;//total de participantes
    let cont = 0;//cantidad de participantes que cumplieron el recorrido y los descalificados
    participantes.forEach(
        participante => {
            if (participante.recorrido >= recorrido || participante.descalificado) {
                cont += 1;
            }
        }
    );
    return cont === n;
}

function valorAleatorioEntre(min, max) {
    return Math.random() * (max - min) + min;
}

function ordenarParticipantes(participantes) {
    return participantes.sort((a, b) => {
        if (a.tiempo === "Descalificado" && b.tiempo !== "Descalificado") {
            return 1;
        }

        if (a.tiempo !== "Descalificado" && b.tiempo === "Descalificado") {
            return -1;
        }

        if (a.tiempo === b.tiempo) {
            return b.recorrido - a.recorrido;
        }

        return a.tiempo_seg_fin - b.tiempo_seg_fin;
    });
}

function actualizarDatos(participantes) {
    participantes.forEach(
        participante => {
            //Lógica
            //caminata => 7 km/h -> 116.66666666666667m/min ... 17 ... 117 ... <17
            //natación => 1,72 m/s -> m/min ... 103 ...<15
            //ciclismo => 45 km/h -> 750.0m/min ... 750 ... <107
            if (participante.descalificado) {
                return
            }

            let probabilidad = 0.1;//<=
            let recorrido;
            if (disciplina_actual === "caminata") {
                if (participante.recorrido >= 10) {
                    return
                }

                recorrido = valorAleatorioEntre(100, 130);
                if (recorrido < 100 + probabilidad) {
                    participante.descalificado = true;
                    participante.tiempo = "Descalificado";
                    return
                }

            } else if (disciplina_actual === "natación") {
                if (participante.recorrido >= 20) {
                    return
                }
                recorrido = valorAleatorioEntre(90, 115);
                if (recorrido < 90 + probabilidad) {
                    participante.descalificado = true;
                    participante.tiempo = "Descalificado";
                    return
                }
            } else if (disciplina_actual === "ciclismo") {
                if (participante.recorrido >= 50) {
                    return
                }

                recorrido = valorAleatorioEntre(740, 760);
                if (recorrido < 740 + probabilidad) {
                    participante.descalificado = true;
                    participante.tiempo = "Descalificado";
                    return
                }
            }


            participante.tiempo_seg_fin = segundos;
            participante.hora_fin = formatearTiempo(segundos);
            participante.tiempo_seg_dif = participante.tiempo_seg_fin - participante.tiempo_seg_inicio;
            participante.tiempo = formatearTiempo(participante.tiempo_seg_dif);
            participante.recorrido += recorrido / 1000;

        }
    );
}

function main() {
    if (interval && finalizado) {
        clearInterval(interval);
        clearInterval(intervalTiempo);
        return;
    }
    actualizarDatos(participantes_actual);
    ordenarParticipantes(participantes_actual);
    actualizarTablaTbody(disciplina_actual, participantes_actual);
    if (disciplina_actual === "caminata" && isFinalize(10, participantes_actual)) {
        disciplina_actual = "natación";
        natacion = caminata.map(participante => {
            if (!participante.descalificado) {
                return {
                    ...participante,  // Copia los demás atributos sin cambios
                    hora_inicio: participante.hora_fin  // Cambia hora_inicio por hora_fin
                };
            }
            return participante;  // Si está descalificado, no cambia nada
        });
        participantes_actual = natacion;
        crear_tabla(disciplina_actual);
    } else if (disciplina_actual === "natación" && isFinalize(20, participantes_actual)) {
        disciplina_actual = "ciclismo";
        ciclismo = natacion.map(participante => {
            if (!participante.descalificado) {
                return {
                    ...participante,  // Copia los demás atributos sin cambios
                    hora_inicio: participante.hora_fin  // Cambia hora_inicio por hora_fin
                };
            }
            return participante;  // Si está descalificado, no cambia nada
        });
        participantes_actual = ciclismo;
        crear_tabla(disciplina_actual);
    } else if (disciplina_actual === "ciclismo" && isFinalize(50, participantes_actual)) {
        finalizado = true;
        ganador = participantes_actual[0];
        if (!ganador.descalificado){
            Swal.fire({
                title: "¡El triatlon ha culminado!",
                text: `El ganador del triatlon es ${ganador.nombre} ${ganador.municipio}`,
                icon: "success"
            });
        }
    }
}