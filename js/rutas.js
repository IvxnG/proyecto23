const url = 'http://localhost:3333/api/race/all';

let options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
};

let card_container = document.getElementById("card_container");
let marker;
let rutas;

cargarRutas();

let filter1 = document.getElementById("filter1");
filter1.addEventListener("keyup", cargarRutas)

function cargarRutas() {
    card_container.innerHTML = "";

    fetch(url, options)
        .then(res => {
            if (res.status == 200) {
                return res.json();
            }
        })
        .then(data => {
            if (filter1.value.trim() != undefined && filter1.value.trim() != "undefined") {
                data.map(({ id }) => {
                    fetch(`http://localhost:3333/api/race/${id}`, options)
                        .then(res => {
                            if (res.status == 200) {
                                return res.json()
                            } else {
                                alert("Error en la carga. Intentelo de nuevo.");
                            }
                        })
                        .then(ruta => {
                            if(ruta.evento.includes( filter1.value.trim() )){
                                console.log("---");
                                console.log(ruta);
                                console.log("---");
                            }
                        })
                })
            }
        })
}

//** */
function mostarRutas(data) {
    data.forEach(event => {
        fetch(`http://localhost:3333/api/race/${event.id}`, options)
            .then(res => {
                if (res.status == 200) {
                    return res.json()
                } else {
                    alert("Error en la carga. Intentelo de nuevo.");
                }
            })
            .then(ruta => {
                marker = L.marker(ruta.coords[0]).addTo(map);
                marker.bindPopup(`<form action="detalles.html" method="get" name="form_id">
                                            <input type="hidden" name="id" value="${ruta.id}">
                                            <input style="background-color:#cdeb9b; color:#126255; "type="submit" value="${ruta.evento}">
                                        </form>`).openPopup();
                card_container.innerHTML += `
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
            )
    });
}

let map = L.map('map').setView([40.416775, -3.703790], 6);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// rutas [{id:_},{id:_},{id:_},]
//rutas.map(({id}) => {
//     fetch()
//     return json
// })