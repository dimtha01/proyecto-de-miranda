// Parámetros de la caminata
const VELOCIDAD_CAMINATA_MAX_KM_H = 7;  // Velocidad máxima de caminata en km/h
const DISTANCIA_CAMINATA_KM = 10;       // Distancia de la caminata en km

// Parámetros de la natación
const VELOCIDAD_NATACION_MAX_KM_S = 0.00172;  // Velocidad de natación en kilómetros por segundo
const DISTANCIA_NATACION_KM = 10;             // Distancia de la natación en kilómetros (10K)

// Convertir la velocidad máxima de caminata a km por segundo
const VELOCIDAD_CAMINATA_MAX_KM_S = VELOCIDAD_CAMINATA_MAX_KM_H / 3600;  // km por segundo

// Parámetros del ciclismo
const VELOCIDAD_CICLISMO_MAX_KM_H = 45;  // Velocidad máxima del ciclista en km/h
const DISTANCIA_CICLISMO_KM = 30;        // Distancia total del ciclismo (30 km)

// Convertir la velocidad máxima de ciclismo a km por segundo
const VELOCIDAD_CICLISMO_MAX_KM_S = VELOCIDAD_CICLISMO_MAX_KM_H / 3600;  // km por segundo

let participantes = [];
let participanteAsistieron = [];

function formatearTiempo(segundos) {
  const horas = Math.floor(segundos / 3600);
  const minutos = Math.floor((segundos % 3600) / 60);
  const seg = segundos % 60;
  return `${horas}h ${minutos}m ${seg}s`;
}
// Función para calcular el tiempo total (sumando caminata, natación y ciclismo)
function calcularTiempoTotal(participante) {
  const tiempoTotalSegundos = participante.segundosCaminar + participante.segundosNadar + participante.segundosCiclismo;
  return formatearTiempo(tiempoTotalSegundos);
}

document.getElementById('formRegistro').addEventListener('submit', function (event) {
  event.preventDefault();  // Evitar que el formulario se envíe

  const nombre = document.getElementById('name').value;
  const cedula = document.getElementById('cedula').value;
  const municipio = document.getElementById('municipio').value;
  const edad = parseInt(document.getElementById('edad').value);


  participantes.push({
    nombre,
    cedula,
    municipio,
    edad,
    asistencia: false,
    distanciaRecorridaCaminar: 0,
    segundosCaminar: 0,
    completadoCaminar: false,
    horaInicioCaminar: null,  // Inicializar como null
    horaFinCaminar: null,
    distanciaRecorridaNadar: 0,
    segundosNadar: 0,
    completadoNadar: false,
    horaInicioNatacion: null,
    horaFinNatacion: null,
    distanciaRecorridaCiclismo: 0,
    segundosCiclismo: 0,
    completadoCiclismo: false,
    horaInicioCiclismo: null,
    horaFinCiclismo: null,
    estado: true
  });

  actualizarTablaDeParticipante();


  // Limpiar el formulario
  document.getElementById('formRegistro').reset();
});

/* function validarFormulario() {
  const horaInput = document.getElementById('horaInicio').value; // Obtiene el valor del input
 

  // Verifica si el campo está vacío
  if (!horaInput) {
    alert("Por favor, selecciona una hora.");
    return; // Previene el envío del formulario
  }

  // Convierte la hora ingresada en un objeto Date
  const [horas, minutos] = horaInput.split(':'); // Separa horas y minutos
  const fechaActual = new Date(); // Obtiene la fecha actual
  const fechaHoraInicio = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate(), horas, minutos);

  // Asigna la hora de inicio de la caminata a todos los participantes
  participantes.forEach(participante => {
    participante.horaInicioCaminar = fechaHoraInicio;  // Fijar hora de inicio de caminata
  });

  console.log(participantes); // Muestra los participantes con la nueva hora
  // Si todo es válido, puedes llamar a la función de simulación
} */
function agregarParticipante() {
  participanteAsistieron = participantes.filter(participante => participante.asistencia);


  const horaInicioEvento = new Date();  // Obtiene la hora actual cuando empieza el evento
  // Asignar la hora de inicio de la caminata a todos los participantes
  participantes.forEach(participante => {
    participante.horaInicioCaminar = new Date(horaInicioEvento.getTime());  // Fijar hora de inicio de caminata
  });
  alert(horaInicioEvento.getTime())
  console.log(participanteAsistieron);
  actualizarTablaDeTriatlon();

}

function actualizarTablaDeParticipante() {
  const tablaBody = document.querySelector('#participatenAsistido tbody');
  tablaBody.innerHTML = "";
  participantes.forEach((participante, index) => {
    // Añadir una fila para el participante con los datos correspondientes
    tablaBody.innerHTML += `
      <tr>
        <td>${participante.nombre}</td>
        <td>${participante.cedula}</td>
        <td>${participante.municipio}</td>
        <td>${participante.edad}</td>
        <td>
          <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="asistencia-${index}" ${participante.asistencia ? 'checked' : ''} onchange="actualizarAsistencia(${index}, this.checked)">
            <label class="form-check-label" for="asistencia-${index}">Asistió</label>
          </div>
        </td>
      </tr>
    `;
  });
}

function actualizarAsistencia(index, estado) {
  participantes[index].asistencia = estado;
}

function actualizarTablaDeTriatlon() {
  const tablaBody = document.querySelector('#tablaDeTriatlon tbody');
  tablaBody.innerHTML = "";
  participanteAsistieron.forEach((participante, index) => {
    // Añadir una fila para el participante con los datos correspondientes\
    const tiempoCaminar = participante.completadoCaminar ? formatearTiempo(participante.segundosCaminar) : "En progreso";
    const tiempoNadar = participante.completadoNadar ? formatearTiempo(participante.segundosNadar) : "En progreso";
    const tiempoCiclismo = participante.completadoCiclismo ? formatearTiempo(participante.segundosCiclismo) : "En progreso";
    const tiempoTotal = calcularTiempoTotal(participante); // Calcular el tiempo total

    // Obtener la hora de inicio y fin para cada etapa, si existe
    const horaInicioCaminar = participante.horaInicioCaminar ? participante.horaInicioCaminar.toLocaleTimeString() : "Sin hora";
    const horaFinCaminar = participante.horaFinCaminar ? participante.horaFinCaminar.toLocaleTimeString() : "En progreso";
    const horaInicioNatacion = participante.horaInicioNatacion ? participante.horaInicioNatacion.toLocaleTimeString() : "N/A";
    const horaFinNatacion = participante.horaFinNatacion ? participante.horaFinNatacion.toLocaleTimeString() : "N/A";
    const horaInicioCiclismo = participante.horaInicioCiclismo ? participante.horaInicioCiclismo.toLocaleTimeString() : "N/A";
    const horaFinCiclismo = participante.horaFinCiclismo ? participante.horaFinCiclismo.toLocaleTimeString() : "N/A";
    const estado = participante.estado ? "Participando" : "Descalificado";


    tablaBody.innerHTML += `
      <tr>
          <td>${participante.nombre}</td>
          <td>${participante.cedula}</td>
          <td>${participante.municipio}</td> <!-- Municipio del participante -->
          <td>${participante.edad}</td>
          <td>${horaInicioCaminar}</td>
          <td>${horaFinCaminar}</td>
          <td>${tiempoCaminar}</td>
          <td>${horaInicioNatacion}</td>
          <td>${horaFinNatacion}</td>
          <td>${tiempoNadar}</td>
          <td>${horaInicioCiclismo}</td>
          <td>${horaFinCiclismo}</td>
          <td>${tiempoCiclismo}</td>
          <td>${tiempoTotal}</td> <!-- Tiempo total -->
          <td>${estado}</td> <!-- Tiempo total -->
      </tr>
    `;
  });

}

function simulacionDeTriatlon() {
  document.getElementById('inscribirse').disabled = true;
  document.getElementById('confimarParticipante').disabled = true;

  const horaInicioEvento = new Date();  // Obtiene la hora actual cuando empieza el evento

  // comentar esto 
  participantes.forEach(participante => {
    participante.horaInicioCaminar = new Date(horaInicioEvento.getTime());  // Fijar hora de inicio de caminata
  });

  simularCaminata();
}
function ordenarParticipantesCaminar(participantes) {
  return participantes.sort((a, b) => {
    // Primero, verifica si alguno de los participantes tiene estado false
    if (!a.estado && !b.estado) {
      return 0; // Ambos son false, mantienen su orden
    } else if (!a.estado) {
      return 1; // 'a' es false, debe ir al final
    } else if (!b.estado) {
      return -1; // 'b' es false, debe ir al final
    }
    // Si ambos tienen estado true, ordena por distancia recorrida
    return b.distanciaRecorridaCaminar - a.distanciaRecorridaCaminar;
  });
}
function simularCaminata() {
  const intervalo = setInterval(() => {
    let todosCompletados = true;


    // Descalificar aleatoriamente un participante una sola vez
    /* if (Math.random() < 0.1) { // 10% de probabilidad en cada intervalo
      const participantesActivos = participanteAsistieron.filter(p => p.estado && !p.completadoCaminar);
      if (participantesActivos.length > 0) {
        const indexAleatorio = Math.floor(Math.random() * participantesActivos.length);
        const participanteDescalificado = participantesActivos[indexAleatorio];
        participanteDescalificado.estado = false; // Descalifica al participante
        console.log(`${participanteDescalificado.nombre} ha sido descalificado.`);
      }
    } */

    ordenarParticipantesCaminar(participanteAsistieron);

    participanteAsistieron.forEach(participante => {
      if (!participante.completadoCaminar) {
        const velocidadAleatoria = Math.random() * VELOCIDAD_CAMINATA_MAX_KM_S;
        participante.distanciaRecorridaCaminar += velocidadAleatoria;

        // Solo incrementa segundosCaminar si el estado es verdadero
        if (participante.estado) { // Verificación añadida
          participante.segundosCaminar++;
        }

        // Verifica si ha completado la distancia de caminata
        if (participante.distanciaRecorridaCaminar >= DISTANCIA_CAMINATA_KM) {
          participante.distanciaRecorridaCaminar = DISTANCIA_CAMINATA_KM;
          participante.completadoCaminar = true;

          // Solo actualiza horaFinCaminar si el estado es verdadero
          if (participante.estado) {
            participante.horaFinCaminar = new Date(participante.horaInicioCaminar.getTime() + participante.segundosCaminar * 1000);
            participante.tiempoTotal = participante.segundosCaminar; // Actualiza tiempo total solo si el estado es verdadero
          }
        }

        // Si no ha completado la caminata, se marca como no completado
        if (!participante.completadoCaminar) {
          todosCompletados = false;
        }
      }
    });

    // Mostrar los resultados en consola
    console.log(`Simulación de Caminata (10K)`);
    participanteAsistieron.forEach(participante => {
      const distanciaRecorridaMetros = (participante.distanciaRecorridaCaminar * 1000).toFixed(2);
      console.log(`${participante.nombre}: ${distanciaRecorridaMetros} metros, Tiempo Total: ${participante.tiempoTotal || 0} segundos`);
    });

    actualizarTablaDeTriatlon();

    // Si todos han completado la caminata, se detiene el intervalo
    if (todosCompletados) {
      clearInterval(intervalo);
      participanteAsistieron.forEach(participante => {
        if (participante.estado) { // Solo asignar horaInicioNatacion si el estado es verdadero
          participante.horaInicioNatacion = new Date(participante.horaFinCaminar.getTime());
        }
      });
      setTimeout(simularNatacion, 10);
    }
  }, 10);
}
function simularNatacion() {
  const intervalo = setInterval(() => {
    let todosCompletados = true;

    participantes.forEach(participante => {
      if (!participante.completadoNadar) {
        const velocidadAleatoria = Math.random() * VELOCIDAD_NATACION_MAX_KM_S;
        participante.distanciaRecorridaNadar += velocidadAleatoria;
        participante.segundosNadar++;

        if (participante.distanciaRecorridaNadar >= DISTANCIA_NATACION_KM) {
          participante.distanciaRecorridaNadar = DISTANCIA_NATACION_KM;
          participante.completadoNadar = true;
          participante.horaFinNatacion = new Date(participante.horaInicioNatacion.getTime() + participante.segundosNadar * 1000);
        }

        if (!participante.completadoNadar) {
          todosCompletados = false;
        }
      }
    });

    console.log(`Simulación de Natación (10K)`);
    participantes.forEach(participante => {
      const distanciaRecorridaKilometros = participante.distanciaRecorridaNadar.toFixed(3);
      console.log(`${participante.nombre}: ${distanciaRecorridaKilometros} km`);
    });

    actualizarTablaDeTriatlon();

    if (todosCompletados) {
      clearInterval(intervalo);
      participantes.forEach(participante => {
        participante.horaInicioCiclismo = new Date(participante.horaFinNatacion.getTime());
      });
      setTimeout(simularCiclismo, 10);
    }
  }, 10);
}

// Función para simular el ciclismo
function simularCiclismo() {
  const intervalo = setInterval(() => {
    let todosCompletados = true;

    participantes.forEach(participante => {
      if (!participante.completadoCiclismo) {
        const velocidadAleatoria = VELOCIDAD_CICLISMO_MAX_KM_S + (Math.random() * 0.0005 - 0.00025);  // Variación en la velocidad
        participante.distanciaRecorridaCiclismo += velocidadAleatoria;
        participante.segundosCiclismo++;

        if (participante.distanciaRecorridaCiclismo >= DISTANCIA_CICLISMO_KM) {
          participante.distanciaRecorridaCiclismo = DISTANCIA_CICLISMO_KM;
          participante.completadoCiclismo = true;
          participante.horaFinCiclismo = new Date(participante.horaInicioCiclismo.getTime() + participante.segundosCiclismo * 1000);
        }

        if (!participante.completadoCiclismo) {
          todosCompletados = false;
        }
      }
    });

    console.log(`Simulación de Ciclismo (30K)`);
    participantes.forEach(participante => {
      const distanciaRecorridaKilometros = participante.distanciaRecorridaCiclismo.toFixed(3);
      console.log(`${participante.nombre}: ${distanciaRecorridaKilometros} km`);
    });

    actualizarTablaDeTriatlon();

    if (todosCompletados) {
      clearInterval(intervalo);
    }
  }, 10);
}

document.querySelector('#confimarParticipante').addEventListener('click', function () {
  agregarParticipante();
  console.log(participantes);
});
