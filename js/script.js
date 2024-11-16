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

  // Datos de los participantes
  let participantes = [];

  // Función para formatear los tiempos en horas, minutos y segundos
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

  // Función para actualizar la tabla HTML
  // Función para registrar a un nuevo participante
  document.getElementById('formRegistro').addEventListener('submit', function (event) {
    event.preventDefault();  // Evitar que el formulario se envíe

    // Verificar si el usuario ha confirmado su asistencia
    const confirmarAsistencia = document.getElementById('confirmarAsistencia').checked;

    if (!confirmarAsistencia) {
      alert("Debes confirmar que vas a asistir al evento.");
      return;  // No registrar al participante si no ha confirmado
    }

    // Obtener los datos del formulario
    const nombre = document.getElementById('nombre').value;
    const cedula = document.getElementById('cedula').value;
    const municipio = document.getElementById('municipio').value;
    const edad = parseInt(document.getElementById('edad').value);

    if(edad < 10){
      alert("la edad tiene que ser mayor a 10 para poder participar")
    }

    // Crear un nuevo participante
    participantes.push({
      nombre,
      cedula,
      municipio,
      edad,
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
      horaFinCiclismo: null
    });

    // Limpiar el formulario
    document.getElementById('formRegistro').reset();

    // Actualizar la tabla
    actualizarTabla();
  });

  // Función para actualizar la tabla de participantes
  function actualizarTabla() {
    const tablaBody = document.querySelector('#resultados tbody');
    tablaBody.innerHTML = '';  // Limpiar la tabla antes de llenarla

    participantes.forEach(participante => {
      // Formatear los tiempos de cada etapa (Caminata, Natación, Ciclismo)
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

      // Añadir una fila para el participante con los datos correspondientes
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
        </tr>
      `;
    });

    // Habilitar el botón de "Empezar Evento" si hay participantes registrados
    document.getElementById('iniciarEvento').disabled = participantes.length === 0;
  }

  // Función para iniciar la simulación
  function iniciarSimulacion() {
    // Desactivar el botón después de iniciarlo
    document.getElementById('iniciarEvento').disabled = true;
    document.getElementById('Registrar').disabled = true;

    // Asignar la hora de inicio de la caminata al momento de empezar el evento
    const horaInicioEvento = new Date();  // Obtiene la hora actual cuando empieza el evento

    // Asignar la hora de inicio de la caminata a todos los participantes
    participantes.forEach(participante => {
      participante.horaInicioCaminar = new Date(horaInicioEvento.getTime());  // Fijar hora de inicio de caminata
    });

    // Iniciar la simulación de la caminata
    simularCaminata();
  }

  // Función para simular la caminata
  function simularCaminata() {
    const intervalo = setInterval(() => {
      let todosCompletados = true;

      participantes.forEach(participante => {
        if (!participante.completadoCaminar) {
          const velocidadAleatoria = Math.random() * VELOCIDAD_CAMINATA_MAX_KM_S;
          participante.distanciaRecorridaCaminar += velocidadAleatoria;
          participante.segundosCaminar++;

          if (participante.distanciaRecorridaCaminar >= DISTANCIA_CAMINATA_KM) {
            participante.distanciaRecorridaCaminar = DISTANCIA_CAMINATA_KM;
            participante.completadoCaminar = true;
            participante.horaFinCaminar = new Date(participante.horaInicioCaminar.getTime() + participante.segundosCaminar * 1000);
          }

          if (!participante.completadoCaminar) {
            todosCompletados = false;
          }
        }
      });

      // Mostrar los resultados en consola
      console.clear();
      console.log(`Simulación de Caminata (10K)`);
      participantes.forEach(participante => {
        const distanciaRecorridaMetros = (participante.distanciaRecorridaCaminar * 1000).toFixed(2);
        console.log(`${participante.nombre}: ${distanciaRecorridaMetros} metros`);
      });

      actualizarTabla();

      if (todosCompletados) {
        clearInterval(intervalo);
        participantes.forEach(participante => {
          participante.horaInicioNatacion = new Date(participante.horaFinCaminar.getTime());
        });
        setTimeout(simularNatacion, 10);
      }
    }, 10);
  }


  // Función para simular la natación
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

      actualizarTabla();

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

      actualizarTabla();

      if (todosCompletados) {
        clearInterval(intervalo);
      }
    }, 10);
  }
