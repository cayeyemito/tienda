// URL de la API
const apiUrlGenres = "https://api.themoviedb.org/3/genre/movie/list?language=es-ES";
const apiUrlFilms = "https://api.themoviedb.org/3/movie/12/videos";
const apiUrlCountries = "https://api.themoviedb.org/3/configuration/countries?language=es-ES"
const apiUrlCompanies = "https://api.themoviedb.org/3/movie/{movie_id}"
let companies = []
const companyRequests = [];

const companyId = 157609; // ID de la compañía
const apiToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Mjg0YzY0NThlOWZkOTljMjFhZGU0ODg1NjIyMTMwNCIsIm5iZiI6MTc0MzQ5NjEyMS45NzIsInN1YiI6IjY3ZWJhM2I5OWJiMjk1ZDZlYThiZWZmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jIArZ0mv9wUmlYTFLl27AKkm3nUAgxd-0d5zcjqUQsI';

const maxID = 258136; // Última ID a consultar
const batchSize = 1; // Número de peticiones simultáneas

const apiUrl = "https://api.themoviedb.org/3/person/5344086";
const bearerToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Mjg0YzY0NThlOWZkOTljMjFhZGU0ODg1NjIyMTMwNCIsIm5iZiI6MTc0MzQ5NjEyMS45NzIsInN1YiI6IjY3ZWJhM2I5OWJiMjk1ZDZlYThiZWZmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jIArZ0mv9wUmlYTFLl27AKkm3nUAgxd-0d5zcjqUQsI";

async function obtenerCreditosPelicula(movieId) {
  try {
    const url = apiUrl.replace("{movie_id}", movieId);

    const response = await fetch(apiUrlFilms, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        Accept: "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status}`);
    }

    const data = await response.json();
    console.log("Créditos de la película:", data);
  } catch (error) {
    console.error("Error al obtener los créditos:", error);
  }
}

// Llamar a la función con un ID de película (ejemplo: 550 para Fight Club)
obtenerCreditosPelicula(550);

/*const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchCompany(id) {
  try {
  const response = await fetch(`https://api.themoviedb.org/3/company/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${apiToken}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`Compañía ${id} no encontrada.`);
  }

  const data = await response.json();
  return {
    id: data.id,
    description: data.description || "",
    headquarters: data.headquarters || "",
    name: data.name || "Desconocido",
    origin_country: data.origin_country || "N/A",
    parent_company: data.parent_company?.name || null
  };

  } catch (error) {
    console.error(error);
    return null; // Devuelve null si hay error
  }
}

async function fetchCompaniesInBatches() {
  for (let i = 240001; i <= maxID; i += batchSize) {
    const batchRequests = [];

    // Crear un lote de promesas de fetch
    for (let j = i; j < i + batchSize && j <= maxID; j++) {
        batchRequests.push(fetchCompany(j));
    }

    // Esperar a que todas las solicitudes del lote terminen
    const results = await Promise.allSettled(batchRequests);

    // Filtrar resultados exitosos y agregarlos al array
    companies.push(...results.filter(r => r.status === "fulfilled" && r.value).map(r => r.value));

    console.log(`Completado hasta la ID: ${i + batchSize - 1}`);

    // Enviar los datos al servidor después de cada lote
    await sendCompaniesToServer();

    // Esperar 500 ms entre lotes para evitar sobrecarga
    await delay(1000);
  }

  console.log("Todas las compañías han sido procesadas.");
}

async function sendCompaniesToServer() {
  if (companies.length === 0) return;

  try {
    const response = await fetch("./php/addApiThings.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: "companies=" + encodeURIComponent(JSON.stringify(companies))
    });

    const data = await response.text();
    console.log("Respuesta del servidor:", data);

    // Limpiar el array después de enviar los datos
    companies = [];
  } catch (error) {
    console.error("Error en la solicitud POST:", error);
  }
}

// Iniciar el proceso
fetchCompaniesInBatches();*/