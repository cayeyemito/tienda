// URL de la API
const apiUrlGenres = "https://api.themoviedb.org/3/genre/movie/list?language=es-ES";
const apiUrlFilms = "https://api.themoviedb.org/3/movie/2?language=es-ES";

// Token de autorización (Bearer)
const apiToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Mjg0YzY0NThlOWZkOTljMjFhZGU0ODg1NjIyMTMwNCIsIm5iZiI6MTc0MzQ5NjEyMS45NzIsInN1YiI6IjY3ZWJhM2I5OWJiMjk1ZDZlYThiZWZmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jIArZ0mv9wUmlYTFLl27AKkm3nUAgxd-0d5zcjqUQsI';

// Realizamos la solicitud a la API con el encabezado de autorización
fetch(apiUrlFilms, {
  method: 'GET', // Método GET
  headers: {
    'Authorization': `Bearer ${apiToken}`, // Enviamos el token de autorización
    'Content-Type': 'application/json' // Indicamos que estamos esperando JSON
  }
})
  .then(response => {
    if (!response.ok) {
      throw new Error('Error en la respuesta de la API');
    }
    return response.json(); // Convertimos la respuesta a formato JSON
  })
  .then(data => {
    console.log(data)

    /*const languages = [];

    // Extraemos los idiomas directamente del array
    data.forEach(language => {
    languages.push({ 
        iso: language.iso_639_1, 
        english_name: language.english_name, 
        name: language.name 
    });
    });

    console.log(languages);

    // Enviar todos los idiomas a PHP en una sola solicitud POST
    fetch("./php/addApiThings.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "languages=" + encodeURIComponent(JSON.stringify(languages)) // Enviamos el arreglo completo
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);  // Aquí puedes mostrar lo que devuelva el servidor
    })
    .catch(error => {
        console.error('Hubo un problema con la solicitud POST:', error);
    });*/
  })
  .catch(error => {
    console.error('Hubo un problema con la solicitud de la API:', error); // Manejo de errores de la API
  });
