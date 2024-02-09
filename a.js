const urlAllRaces = 'http://localhost:3333/api/race/all';
const urlRaceDetails = 'http://localhost:3333/api/race/';

const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
};

const cardContainer = document.getElementById("card_container");
let map = L.map('map').setView([40.416775, -3.703790], 6);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function actualizarMapa(rutas) {
    // Limpiar todas las marcas del mapa
    map.eachLayer(function(layer) {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });

    // Agregar nuevas marcas para las rutas que cumplen los filtros
    rutas.forEach(ruta => {
        const marker = L.marker(ruta.coords[0]).addTo(map);
        marker.bindPopup(`<form action="detalles.html" method="get" name="form_id">
                            <input type="hidden" name="id" value="${ruta.id}">
                            <input style="background-color:#cdeb9b; color:#126255; "type="submit" value="${ruta.evento}">
                        </form>`).openPopup();
    });
}

function cargarRutas() {
    cardContainer.innerHTML = "";
    
    fetch(urlAllRaces, options)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                throw new Error("Error en la carga de rutas.");
            }
        })
        .then(data => {
            // Obtener todas las promesas de detalles de ruta con filtro aplicado
            const promises = data.map(({ id }) => {
                return fetch(`${urlRaceDetails}${id}`, options)
                    .then(res => {
                        if (res.status === 200) {
                            return res.json();
                        } else {
                            throw new Error("Error en la carga de detalles de ruta.");
                        }
                    })
                    .then(ruta => {
                        // Verificar si el nombre de la ruta coincide con el filtro por nombre
                        const nombreFiltro = filter1.value.trim().toLowerCase();
                        const comunidadFiltro = filterComunidad.value.trim().toLowerCase();
                        const distanciaMinima = parseInt(filterDistanciaMinima.value.trim()); // Convertir a entero
                        const distanciaMaxima = parseInt(filterDistanciaMaxima.value.trim()); // Convertir a entero
                        
                        const coincideNombre = nombreFiltro === "" || (ruta.evento && ruta.evento.toLowerCase().includes(nombreFiltro));
                        
                        // Verificar si se debe aplicar el filtro por comunidad autónoma
                        let coincideComunidad = true;
                        if (comunidadFiltro !== "todas") {
                            coincideComunidad = (ruta.comunidad && ruta.comunidad.toLowerCase().includes(comunidadFiltro));
                        }
                        
                        // Verificar si se debe aplicar el filtro por distancia mínima
                        let cumpleDistanciaMinima = true;
                        if (!isNaN(distanciaMinima)) {
                            cumpleDistanciaMinima = ruta.distancia >= distanciaMinima;
                        }
                        
                        // Verificar si se debe aplicar el filtro por distancia máxima
                        let cumpleDistanciaMaxima = true;
                        if (!isNaN(distanciaMaxima)) {
                            cumpleDistanciaMaxima = ruta.distancia <= distanciaMaxima;
                        }
                        
                        if (coincideNombre && coincideComunidad && cumpleDistanciaMinima && cumpleDistanciaMaxima) {
                            return ruta; // Devuelve la ruta si pasa los filtros
                        } else {
                            return null; // Devuelve null si no pasa los filtros
                        }
                    });
            });
            
            return Promise.all(promises);
        })
        .then(rutas => {
            const rutasFiltradas = rutas.filter(ruta => ruta !== null);
            if (rutasFiltradas.length === 0) {
                // Si no hay rutas que cumplan los filtros, agregar texto explicativo
                cardContainer.innerHTML = "<p>No hay rutas que cumplan los filtros seleccionados.</p>";
            } else {
                // Si hay rutas que cumplan los filtros, actualizar el mapa y mostrar las rutas en la lista
                actualizarMapa(rutasFiltradas);
                rutasFiltradas.forEach(ruta => mostrarRuta(ruta));
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Hubo un error al cargar las rutas.");
        });
}




function mostrarRuta(ruta) {
    const marker = L.marker(ruta.coords[0]).addTo(map);
    marker.bindPopup(`<form action="detalles.html" method="get" name="form_id">
                        <input type="hidden" name="id" value="${ruta.id}">
                        <input style="background-color:#cdeb9b; color:#126255; "type="submit" value="${ruta.evento}">
                    </form>`).openPopup();
    
    cardContainer.innerHTML += `
        <div class="card">
            <div class="card_content">
                <h3 class="card_title">${ruta.evento}</h3>
                <p class="card_distance" <b>Distancia</b> : ${ruta.distancia} mts</p>
                <p class="card_cat"><b>Categoria</b>: ${ruta.categoria}</p>
                <p class="card_location"><b>Comunidad</b> : ${ruta.comunidad}</p>
                <p class="card_location"><b>Provincia</b> : ${ruta.provincia}</p>
                <form action="detalles.html" method="get" name="form_id">
                    <input type="hidden" name="id" value="${ruta.id}">
                    <input style="background-color:#cdeb9b; color:#126255;" type="submit" value="Más Info.">
                </form>
            </div>
        </div>`;
}

// Evento para cargar las rutas cuando se escriba en el filtro de nombre
const filter1 = document.getElementById("filter1");
filter1.addEventListener("keyup", cargarRutas);

// Obtener referencia al select de comunidad autónoma
const filterComunidad = document.getElementById("filterComunidad");
filterComunidad.addEventListener("change", cargarRutas);

// Obtener referencia al campo de texto de distancia mínima
const filterDistanciaMinima = document.getElementById("filterDistanciaMinima");
filterDistanciaMinima.addEventListener("keyup", cargarRutas);

// Obtener referencia al campo de texto de distancia máxima
const filterDistanciaMaxima = document.getElementById("filterDistanciaMaxima");
filterDistanciaMaxima.addEventListener("keyup", cargarRutas);

// Cargar las rutas al inicio
cargarRutas();
