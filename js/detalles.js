let form_id = window.location.search;
form_id = Number(form_id.slice(4,));
console.log(form_id);

let detalles = document.getElementById("detalles")

rutas.forEach(element => {
    if (element.id == form_id) {
        detalles.innerHTML = `
        <section class="first">
            <h2>Información General</h2>
            <p><strong>Nombre:</strong> ${element.title}</p>
            <p><strong>Fecha:</strong> ${element.date}</p>
            <p><strong>Lugar:</strong> ${element.location}</p>
            <p><strong>Distancia:</strong> ${element.title}</p>
        </section>
  
        <section>
            <h2>Ubicación en el Mapa</h2>
            <div class="map-container">
            <div id="map"></div>
            </div>
        </section>
    
        <section>
            <h2>Inscripción</h2>
            <p><strong>Costo de Inscripción:</strong> [Costo]</p>
        </section>
    
        <section>
            <h2>Ruta</h2>
            <p>Descripción de la ruta, puntos de interés, etc.</p>
        </section>
        `;
    }
})

var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

 let waypoints = [
    L.latLng(57.74, 11.94),
    L.latLng(58.74, 12.94),
  ]

  console.log(waypoints);
console.log("asdggjkf");

waypoints.push({ lat: 60.74, lng: 15.94 })

console.log(waypoints);

L.Routing.control({
    waypoints,
    routeWhileDragging: false
  }).addTo(map);

// var marker = L.marker([48.5, -0.09]).addTo(map);

// marker.bindPopup("<b>Salida</b><br>C/street").openPopup();

