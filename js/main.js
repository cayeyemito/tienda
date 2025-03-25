let correo
let nombre
let birthdate
let telefono
let password

function openModal(type) {
    const modal = document.getElementById(`${type}Modal`);
    modal.style.display = 'flex';
    document.querySelectorAll(`#${type}Modal .input-error`).forEach(error => error.style.display = 'none');
    if (type === 'register') {
        document.getElementById('step1').style.display = 'block';
        document.getElementById('step2').style.display = 'none';
    }
}

function closeModal(type) {
    document.getElementById(`${type}Modal`).style.display = 'none';
}

function showError(inputId, message) {
    let errorElement;
    const input = document.getElementById(inputId);
    
    if (inputId === 'terms') {
        errorElement = input.closest('.terms-group').querySelector('.terms-error');
    } else {
        errorElement = input.closest('.modal-input-group').querySelector('.input-error');
    }
    
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    // Forzar reflow para activar la transición
    void errorElement.offsetHeight;
    errorElement.classList.add('active');
    
    setTimeout(() => {
        errorElement.classList.remove('active');
        errorElement.style.display = 'none';
    }, 5000);
}

function nextStep() {
    let hasErrors = false;
    
    // Validación del paso 1
    const validateField = (id, errorMessage) => {
        const value = document.getElementById(id).value.trim();
        if (!value) {
            showError(id, errorMessage);
            hasErrors = true;
        }
    };

    validateField('registerName', 'Nombre requerido');
    validateField('registerEmail', 'Email requerido');
    validateField('registerPassword', 'Contraseña requerida');

    nombre = document.getElementById('registerName').value.trim();
    correo = document.getElementById('registerEmail').value.trim();
    if (correo && !/\S+@\S+\.\S+/.test(correo)) {
        showError('registerEmail', 'Formato de email inválido');
        hasErrors = true;
    }

    password = document.getElementById('registerPassword').value.trim();
    if (password && password.length < 6) {
        showError('registerPassword', 'Mínimo 6 caracteres');
        hasErrors = true;
    }

    if (!hasErrors) {
        document.getElementById('step1').style.display = 'none';
        document.getElementById('step2').style.display = 'block';
    }
}

function validateLoginForm(event) {
    event.preventDefault();
    let hasErrors = false;
    
    const validateField = (id, errorMessage) => {
        const value = document.getElementById(id).value.trim();
        if (!value) {
            showError(id, errorMessage);
            hasErrors = true;
        }
    };

    validateField('loginEmail', 'Email requerido');
    validateField('loginPassword', 'Contraseña requerida');

    const password = document.getElementById('loginPassword').value.trim();
    const email = document.getElementById('loginEmail').value.trim();
    if (email && !/\S+@\S+\.\S+/.test(email)) {
        showError('loginEmail', 'Formato de email inválido');
        hasErrors = true;
    }

    fetch(`./php/get_user.php`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `correo=${encodeURIComponent(email)}&contrasenya=${encodeURIComponent(password)}`
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(response => response.text())
        .then(text => {
            console.log("Respuesta completa:", text);
        })
    .catch(error => console.error("Error:", error));
}

function validateRegisterForm(event) {
    event.preventDefault();
    let hasErrors = false;
    
    // Validación del paso 2
    birthdate = document.getElementById('birthdate').value;
    if (!birthdate) {
        showError('birthdate', 'Fecha de nacimiento requerida');
        hasErrors = true;
    }

    telefono = document.getElementById('telefono').value;
    if (!telefono) {
        showError('telefono', 'Teléfono requerido');
        hasErrors = true;
    }

    const terms = document.getElementById('terms').checked;
    if (!terms) {
        showError('terms', 'Debes aceptar los términos');
        hasErrors = true;
    }

    if (!hasErrors) {
        event.preventDefault();

        fetch("./php/save_user.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `nombre=${nombre}&correo=${correo}&fechaNacimiento=${birthdate}&contrasenya=${password}&telefono=${telefono}`
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            closeModal('register');
        })
    }
}