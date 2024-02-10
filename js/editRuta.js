if(localStorage.getItem("rol") !== "organizer"){
    location.href = "../index.html";
}

// Obtener el ID del formulario desde la URL
let form_id = window.location.search.slice(4);

// Obtener los elementos del formulario por su ID
let eventoInput = document.getElementById("evento");
let distanciaInput = document.getElementById("distancia");
let categoriaSelect = document.getElementById("categoria");
let dateInput = document.getElementById("date");
let primeroInput = document.getElementById("primero");
let segundoInput = document.getElementById("segundo");
let terceroInput = document.getElementById("tercero");
let btnCreate = document.getElementById("btnCreate");
let btnDelete = document.getElementById("btnDelete");

btnCreate.addEventListener("click", editRuta)
btnDelete.addEventListener("click", deleteRuta)
// URL y opciones para la solicitud GET
const url = `http://localhost:3333/api/race/${form_id}`;
const optionsGet = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
};

// Realizar la solicitud GET para obtener los datos del formulario
fetch(url, optionsGet)
    .then(res => {
        if (res.status === 200) {
            return res.json();
        } else {
            throw new Error("Error al cargar datos.");
        }
    })
    .then(ruta => {
        // Llenar los campos del formulario con los datos obtenidos
        eventoInput.value = ruta.evento;
        distanciaInput.value = ruta.distancia;
        categoriaSelect.value = ruta.categoria;
        dateInput.value = ruta.date;
        primeroInput.value = ruta.primero;
        segundoInput.value = ruta.segundo;
        terceroInput.value = ruta.tercero;
    })
    .catch(error => {
        console.error("Error al realizar la solicitud:", error);
    });

function editRuta(e) {
    e.preventDefault();

    // Verificar si existen datos en los campos de entrada
    const inputsWithData = [eventoInput, distanciaInput, categoriaSelect, dateInput, primeroInput, segundoInput, terceroInput];
    const hasData = inputsWithData.every(input => input.value.trim() !== '');

    if (!hasData) {
        alert("Por favor, complete todos los campos antes de editar el evento.");
        return;
    }

    let optionsPut = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "evento": eventoInput.value,
            "distancia": distanciaInput.value,
            "categoria": categoriaSelect.value,
            "date": dateInput.value,
            // "comunidad" : formGpx.elements.comunidad.value,
            // "provincia" : formGpx.elements.provincia.value,
            "primero": primeroInput.value,
            "segundo": segundoInput.value,
            "tercero": terceroInput.value,
        }),
    };

    fetch(url, optionsPut)
        .then(response => {
            if (response.status == 200) {
                alert("Evento editado con éxito!!");
                return response.json();
            } else {
                throw new Error("Error al guardar los datos.");
            }
        })
        .then(data => {
            console.log(data);
            location.href = "../html/rutas.html";
        })
        .catch(error => {
            console.error("Error al realizar la solicitud:", error);
        });
}


function deleteRuta(e) {
    e.preventDefault()

    let optionsDelete = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    };

    fetch(url, optionsDelete)
        .then(response => {
            if (response.status == 200) {
                alert("Evento borrado con exito!!")
                location.href = "../html/rutas.html";
            } else {
                throw new Error("Error al borrar los datos.");
            }
        })
        .catch(error => {
            console.error("Error al realizar la solicitud:", error);
        });
}

