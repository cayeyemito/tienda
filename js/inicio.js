let user;

document.addEventListener('DOMContentLoaded', function() {
    // Función para controlar el desplazamiento horizontal de las películas populares
    const popularMovies = document.getElementById('popular-movies');
    const prevPopular = document.getElementById('prev-popular');
    const nextPopular = document.getElementById('next-popular');
    
    // Configurar botones de navegación para películas populares
    prevPopular.addEventListener('click', function() {
        popularMovies.scrollBy({ left: -280, behavior: 'smooth' });
    });
    
    nextPopular.addEventListener('click', function() {
        popularMovies.scrollBy({ left: 280, behavior: 'smooth' });
    });
    
    // Función para controlar el desplazamiento horizontal de las películas premiadas
    const awardMovies = document.getElementById('award-movies');
    const prevAward = document.getElementById('prev-award');
    const nextAward = document.getElementById('next-award');
    
    // Configurar botones de navegación para películas premiadas
    prevAward.addEventListener('click', function() {
        awardMovies.scrollBy({ left: -200, behavior: 'smooth' });
    });
    
    nextAward.addEventListener('click', function() {
        awardMovies.scrollBy({ left: 200, behavior: 'smooth' });
    });
});

window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("blur");
    } else {
        navbar.classList.remove("blur");
    }
});

window.onload = function () {
    const params = new URLSearchParams(window.location.search);
    const encodedEmail = params.get("email");

    if (encodedEmail) {
        try {
            user = atob(encodedEmail);
            console.log("Email recibido:", user);
        } catch (e) {
           console.log("Error al decodificar el email.");
        }
    } else {
        console.log("No se proporcionó ningún email.");
    }
};