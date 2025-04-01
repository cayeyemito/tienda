// URL de la API
const apiUrl = 'https://api.themoviedb.org/3/movie/11?language=es-ES';
const apiUrlGenres = "https://api.themoviedb.org/3/genre/movie/list?language=en"

// Token de autorización (Bearer)
const apiToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Mjg0YzY0NThlOWZkOTljMjFhZGU0ODg1NjIyMTMwNCIsIm5iZiI6MTc0MzQ5NjEyMS45NzIsInN1YiI6IjY3ZWJhM2I5OWJiMjk1ZDZlYThiZWZmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jIArZ0mv9wUmlYTFLl27AKkm3nUAgxd-0d5zcjqUQsI';

// Realizamos la solicitud a la API con el encabezado de autorización
fetch(apiUrlGenres, {
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
    console.log('Datos recibidos:', data); // Aquí procesas los datos recibidos
  })
  .catch(error => {
    console.error('Hubo un problema con la solicitud:', error); // Manejo de errores
  });
