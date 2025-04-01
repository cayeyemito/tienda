// En tu archivo main.js
let count = 5;
let animation;
const initialBrightness = 1; // Valor inicial del brillo
const targetBrightness = 0; // Valor final del brillo (más oscuro)

function updateBackground(progress) {
    const currentBrightness = initialBrightness - (initialBrightness - targetBrightness) * progress;
    document.body.style.filter = `sepia(0.75) brightness(${currentBrightness})`;
}

function animate(timestamp, startTime) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / 1000, 1);
    
    updateBackground(progress);
    
    if (progress < 1) {
        animation = requestAnimationFrame((ts) => animate(ts, startTime));
    }
}

function startAnimation() {
    cancelAnimationFrame(animation);
    animation = requestAnimationFrame((ts) => animate(ts, ts));
}

// Modifica tu temporizador
const timer = setInterval(() => {
  count--;
  document.getElementById('cuentaAtras').textContent = count;

  if (count <= 0) {
      clearInterval(timer);
      startAnimation();

      // Restaurar brillo después de la animación
      setTimeout(() => {
        restartBrightness()
      }, 1000);
  }
}, 1000);

function restartBrightness() {
  cancelAnimationFrame(animation);
  
  const mainSection = document.getElementById('mainSection');
  const contenido = document.getElementById('contenido');

  if (mainSection) mainSection.innerHTML = '';
  if (contenido) contenido.innerHTML = '';

  // Iniciar una animación inversa para restaurar el brillo a 1
  function animateRestore(timestamp, startTime) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / 1000, 1); // Progreso en 1 segundo

      const currentBrightness = targetBrightness + (initialBrightness - targetBrightness) * progress;
      document.body.style.filter = `sepia(0.75) brightness(${currentBrightness})`;

      if (progress < 1) {
          animation = requestAnimationFrame((ts) => animateRestore(ts, startTime));
      }
  }

  animation = requestAnimationFrame((ts) => animateRestore(ts, ts));
}

// Inicializar brillo al cargar
document.body.style.filter = `sepia(0.75) brightness(${initialBrightness})`;
