let form_id = window.location.search;
form_id = form_id.slice(4,);
let map = "";
let waypoints;

let url = `http://localhost:3333/api/race/${form_id}`;
let options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
};

let detalles = document.getElementById("detalles")

fetch(url, options)
    .then(res => {
        if (res.status == 200) {
            return res.json()
                .then(ruta => {
                    waypoints = ruta.coords
                    detalles.innerHTML = `
                                            <section class="first">
                                                <h2>Información General</h2>
                                                <p><strong>Nombre:</strong> ${ruta.evento}</p>
                                                <p><strong>Categoria:</strong> ${ruta.categoria}</p>
                                                <p><strong>Lugar:</strong> ${ruta.provincia}, ${ruta.comunidad}</p>
                                                <p><strong>Distancia:</strong> ${ruta.distancia} mts</p>
                                            </section>
                                        
                                            <section>
                                                <h2>Ubicación en el Mapa</h2>
                                                <div class="map-container">
                                                <div id="map"></div>
                                                </div>
                                            </section>
                                            
                                            <section>
                                                <h2>Detalles</h2>
                                                <p><strong>Desnivel : </strong> ${ruta.desnivel} mts</p>
                                                <p><strong>Desnivel Positivo : </strong> ${ruta.desPos} mts</p>
                                                <p><strong>Desnivel Negativo : </strong> ${ruta.desNeg} mts</p>
                                            </section>
                                            `;

                    map = L.map('map').setView(ruta.coords[0], 10);

                    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        maxZoom: 19,
                        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    }).addTo(map);

                    let inicio = L.marker(ruta.coords[0]).addTo(map);
                    inicio.bindPopup("<b>Inicio</b><br>").openPopup();

                    let fin = L.marker(ruta.coords[ruta.coords.length - 1]).addTo(map);
                    fin.bindPopup("<b>Fin</b><br>");

                    L.polyline(
                        ruta.coords,
                        {color : "green"}
                    ).addTo(map);


                })
        } else {
            alert("Error en la carga. Intentelo de nuevo.");
        }
    })


