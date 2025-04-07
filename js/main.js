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

  if (mainSection) mainSection.innerHTML = "<div class='container-fluid'><div class='col-12 header divAbsolut'><div class='col-1 offset-1 about'><div>ABOUT</div></div><div class='col-2 offset-5 icon'><img src='img/palomitas.png'></div><div class='col-1 offset-10 menu'><div>MENÚ</div></div></div><div class='mainContent divAbsolut'><div class='pageName'><p class='title littleText'>THE</p><p class='title'>WATCHNIGHT</p><p class='title'>SHOW</p><div class='buttons'><button class='iniciarSesion'>Iniciar sesión</button><button class='registrarse'>Registrarse</button></div></div></div></div><div class='footer divAbsolut'><div class='footerText'><p>The Watchnight Show es una comunidad abierta y sin ánimo de lucro</p></div></div>";
  if (contenido) contenido.innerHTML = '';

  // Agregar listeners DESPUÉS de crear los botones
  setTimeout(() => {
    // Listener para iniciar sesión
    document.querySelector('.iniciarSesion')?.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector('.login-popup').style.display = 'flex';
    });
    
    // Listener para registrarse (por si lo necesitas)
    document.querySelector('.registrarse')?.addEventListener('click', function(e) {
      e.preventDefault();
      // Lógica para registro
    });
  }, 0);

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

document.body.addEventListener('click', function(e) {
    // Abrir popup
    if(e.target.classList.contains('iniciarSesion')) {
      e.preventDefault();
      document.querySelector('.login-popup').style.display = 'flex';
    }
    
    // Cerrar popup
    if(e.target.classList.contains('close-btn') || e.target.classList.contains('popup-overlay')) {
      document.querySelector('.login-popup').style.display = 'none';
    }
});