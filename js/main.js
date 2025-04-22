// En tu archivo main.js
let count = 5;
let animation;
const initialBrightness = 1; // Valor inicial del brillo
const targetBrightness = 0; // Valor final del brillo (más oscuro)
let isCounting = true;

function updateBackground(progress) {
    const currentBrightness = initialBrightness - (initialBrightness - targetBrightness) * progress;
    document.body.style.filter = `sepia(0.60) brightness(${currentBrightness})`;
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
  if (!isCounting) return;

  count--;
  document.getElementById('cuentaAtras').textContent = count;

  if (count <= 0) {
      clearInterval(timer);
      isCounting = false;
      startAnimation();

      // Restaurar brillo después de la animación
      setTimeout(() => {
        restartBrightness()
      }, 1000);
  }
}, 1000);

document.body.addEventListener('click', function() {
  if (isCounting) { // Solo permitir saltar la cuenta atrás si está en curso
      isCounting = false;
      clearInterval(timer); // Detenemos la cuenta atrás

      // Saltamos a la siguiente parte (animación)
      startAnimation();

      setTimeout(() => {
          restartBrightness();
      }, 1000);
  }
});

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
      document.querySelector('.register-popup').style.display = 'flex';
    });

    document.getElementById("register-form").addEventListener("submit", function(e) {
      e.preventDefault();
    
      // Obtener el valor de la contraseña visible o la oculta (según cuál esté activa)
      const passHidden = document.getElementById("register-pass-hidden");
      const passVisible = document.getElementById("register-pass-visible");
    
      const passwordValue = passHidden.classList.contains("active") 
          ? passHidden.value 
          : passVisible.value;
    
      // Actualizar el valor en el input con name="password" antes de enviar
      const password = passwordValue;
      const email = document.getElementById('email').value
      const nombre = document.getElementById('registerName').value

      if (!nombre || nombre.trim() === "") {
        alert("Por favor, ingresa un nombre.");
        return;
      }

      if (!email || !validateEmail(email)) {
        alert("Por favor, ingresa un correo electrónico válido.");
        return;
      }

      if (!passwordValue || passwordValue.length < 3) {
          alert("La contraseña debe tener al menos 3 caracteres.");
          return;
      }
      
      const body = `password=${encodeURIComponent(password)}&email=${encodeURIComponent(email)}&nombre=${encodeURIComponent(nombre)}`;

      fetch('/php/save_user.php', {
        method: 'POST',
        body: body,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'  // Asegúrate de especificar el tipo de contenido
        }
      })
      .then(res => {
        return res.json();
      })
      .then(data => {
        if (data.status === "error" && data.message === "El correo ya está registrado.") {
          alert("Este correo ya está registrado. Por favor, usa otro.");
        } else if (data.status === "success") {
          alert("Usuario registrado correctamente.");
          const emailCodificado = btoa(email)
          window.location.href = `inicio.html?email=${emailCodificado}`;
        } else {
          alert(data.message);
        }
      })
      .catch(err => {
          console.error("Error:", err);
      });
    });

    document.getElementById("login-form").addEventListener("submit", function(e) {
      e.preventDefault();
    
      // Obtener el valor de la contraseña visible o la oculta (según cuál esté activa)
      const passHidden = document.getElementById("login-pass-hidden");
      const passVisible = document.getElementById("login-pass-visible");
    
      const passwordValue = passHidden.classList.contains("active") 
          ? passHidden.value 
          : passVisible.value;
    
      // Actualizar el valor en el input con name="password" antes de enviar
      const password = passwordValue;
      const email = document.getElementById('loginEmail').value

      if (!email || !validateEmail(email)) {
        alert("Por favor, ingresa un correo electrónico válido.");
        return;
      }

      if (!passwordValue || passwordValue.length < 3) {
          alert("La contraseña debe tener al menos 3 caracteres.");
          return;
      }
      
      const body = `password=${encodeURIComponent(password)}&email=${encodeURIComponent(email)}`;

      fetch('/php/get_user.php', {
        method: 'POST',
        body: body,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'  // Asegúrate de especificar el tipo de contenido
        }
      })
      .then(res => {
        return res.json();
      })
      .then(data => {
        if(data.status === 'success'){
          alert(`Bienvenido de vuelta ${data.usuario.nombre}`);
          const emailCodificado = btoa(email)
          window.location.href = `inicio.html?email=${emailCodificado}`;
        } else if(data.status === 'error'){
          if(data.message === 'Contraseña incorrecta.'){
            alert(`La contraseña no es correcta`);
          } else if(data.message === 'El usuario no existe.'){
            alert(`Ese usuario no existe`);
          }  
        }
      })
      .catch(err => {
          console.error("Error:", err);
      });
    });
  }, 0);

  // Iniciar una animación inversa para restaurar el brillo a 1
  function animateRestore(timestamp, startTime) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / 1000, 1); // Progreso en 1 segundo

      const currentBrightness = targetBrightness + (initialBrightness - targetBrightness) * progress;
      document.body.style.filter = `sepia(0.60) brightness(${currentBrightness})`;

      if (progress < 1) {
          animation = requestAnimationFrame((ts) => animateRestore(ts, startTime));
      }
  }

  animation = requestAnimationFrame((ts) => animateRestore(ts, ts));
}

// Inicializar brillo al cargar
document.body.style.filter = `sepia(0.60) brightness(${initialBrightness})`;

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

document.body.addEventListener('click', function(e) {
  // Abrir popup
  if(e.target.classList.contains('registrarse')) {
    e.preventDefault();
    document.querySelector('.register-popup').style.display = 'flex';
  }
  
  // Cerrar popup
  if(e.target.classList.contains('close-btn') || e.target.classList.contains('popup-overlay')) {
    document.querySelector('.register-popup').style.display = 'none';
  }
});


function showText(formType) {
  const passHidden = document.getElementById(`${formType}-pass-hidden`);
  const passVisible = document.getElementById(`${formType}-pass-visible`);
  const eyeIcon = passHidden.closest('form')?.querySelector('.clickable-icon') || document.querySelector(`.clickable-icon`);

  if (passHidden.classList.contains('active')) {
    passVisible.value = passHidden.value;
    passHidden.classList.remove('active');
    passHidden.classList.add('inactive');
    passVisible.classList.remove('inactive');
    passVisible.classList.add('active');
    passVisible.focus();
    eyeIcon.src = 'img/ojo.png';
  } else {
    passHidden.value = passVisible.value;
    passVisible.classList.remove('active');
    passVisible.classList.add('inactive');
    passHidden.classList.remove('inactive');
    passHidden.classList.add('active');
    passHidden.focus();
    eyeIcon.src = 'img/ojo-abierto.png';
  }
}

document.getElementById('register-pass-hidden').addEventListener('input', e => {
  document.getElementById('register-pass-visible').value = e.target.value;
});
document.getElementById('login-pass-visible').addEventListener('input', e => {
  document.getElementById('login-pass-hidden').value = e.target.value;
});

function openRegisterForm(){
  document.querySelector('.login-popup').style.display = 'none';
  document.querySelector('.register-popup').style.display = 'flex';
}

function openLoginForm(){
  document.querySelector('.login-popup').style.display = 'flex';
  document.querySelector('.register-popup').style.display = 'none';
}

function validateEmail(email) {
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
}