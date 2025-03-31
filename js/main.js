let contador = 5; // Número inicial

const cuentaAtras = document.getElementById('cuentaAtras'); // Obtener el elemento

// Función para actualizar la cuenta regresiva
const actualizarCuentaAtras = () => {
  if (contador > 0) {
    contador--; // Restar 1 al contador
    cuentaAtras.textContent = contador; // Actualizar el contenido del h1
  } else {
    clearInterval(intervalo); // Detener el intervalo cuando llega a 0
  }
};

// Ejecutar la función cada 1 segundo
const intervalo = setInterval(actualizarCuentaAtras, 1000);