// Parámetros de la natación
const VELOCIDAD_NATACION_MAX_KM_S = 0.00172;  // Velocidad de natación en kilómetros por segundo (equivalente a 1.72 metros por segundo)
const DISTANCIA_NATACION_KM = 1;             // Distancia de la natación en kilómetros (10K)

// Datos de los participantes
let participantes = [
  {
    nombre: 'Juan Pérez',
    distanciaRecorridaNadar: 0,
    segundosNadar: 0,
    completadoNadar: false,
    horaInicioNatacion: new Date(),  // Hora de inicio de la natación
    horaFinNatacion: null
  },
  {
    nombre: 'Ana Gómez',
    distanciaRecorridaNadar: 0,
    segundosNadar: 0,
    completadoNadar: false,
    horaInicioNatacion: new Date(),  // Hora de inicio de la natación
    horaFinNatacion: null
  }
];

// Función para simular la natación en kilómetros
function simularNatacion() {
  const intervalo = setInterval(() => {
    let todosCompletados = true;

    // Actualizar la distancia recorrida por cada persona
    participantes.forEach(participante => {
      if (!participante.completadoNadar) {
        // Generamos una velocidad aleatoria dentro del rango de 0 a VELOCIDAD_NATACION_MAX_KM_S
        const velocidadAleatoria = Math.random() * VELOCIDAD_NATACION_MAX_KM_S;

        // Calculamos la distancia recorrida en ese segundo (en kilómetros)
        const avanceAleatorio = velocidadAleatoria;

        // Acumular el avance en kilómetros
        participante.distanciaRecorridaNadar += avanceAleatorio;

        // Incrementar el contador de segundos
        participante.segundosNadar++;

        // Verificar si alguien ha llegado a los 10 km
        if (participante.distanciaRecorridaNadar >= DISTANCIA_NATACION_KM) {
          participante.distanciaRecorridaNadar = DISTANCIA_NATACION_KM;  // Ajustar para que no pase de 10 km
          participante.completadoNadar = true;  // Marcar como completado
          participante.horaFinNatacion = new Date(participante.horaInicioNatacion.getTime() + participante.segundosNadar * 1000);  // Guardamos la hora de finalización de la natación
        }

        // Si el participante no ha completado la natación, entonces no hemos terminado la simulación
        if (!participante.completadoNadar) {
          todosCompletados = false;
        }
      }
    });

    // Mostrar la tabla actualizada
    console.clear();
    console.log(`Simulación de Natación (10K)`);
    console.log(`------------------------------------`);
    participantes.forEach(participante => {
      const distanciaRecorridaKilometros = participante.distanciaRecorridaNadar.toFixed(3);  // Mostramos en kilómetros
      console.log(`${participante.nombre}: ${distanciaRecorridaKilometros} km`);
    });
    console.log(`------------------------------------`);

    // Verificar si todos han terminado la natación
    if (todosCompletados) {
      clearInterval(intervalo);  // Detener la simulación de natación una vez ambos hayan completado

      // Calcular y mostrar la información de cada participante
      participantes.forEach(participante => {
        const tiempoTotalSegundos = participante.segundosNadar;  // Total de segundos que el participante tardó
        const horas = Math.floor(tiempoTotalSegundos / 3600);
        const minutos = Math.floor((tiempoTotalSegundos % 3600) / 60);
        const segundos = tiempoTotalSegundos % 60;

        const tiempoTotalFormateado = `${horas} horas, ${minutos} minutos, ${segundos} segundos`;

        const horaFin = new Date(participante.horaInicioNatacion.getTime() + tiempoTotalSegundos * 1000);

        console.log(`\n¡La natación ha terminado para ${participante.nombre}!`);
        console.log(`${participante.nombre} comenzó a las: ${participante.horaInicioNatacion.toLocaleTimeString()}`);
        console.log(`${participante.nombre} terminó a las: ${horaFin.toLocaleTimeString()}`);
        console.log(`${participante.nombre} recorrió: ${DISTANCIA_NATACION_KM} km`);
        console.log(`Tiempo total para ${participante.nombre}: ${tiempoTotalSegundos.toFixed(2)} segundos`);
        console.log(`Tiempo total para ${participante.nombre}: ${tiempoTotalFormateado}`);
      });
    }
  }, 1);  // Intervalo de natación ajustado para mejor control de la simulación
}

// Iniciar la simulación de natación
simularNatacion();
