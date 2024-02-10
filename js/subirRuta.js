//URL crear carrera
const url = 'http://localhost:3333/api/race/new';

// Obtener elementos del DOM
let inputGPX = document.getElementById("inputGPX");
let formGpx = document.getElementById("formGpx");
let btnGpx = document.getElementById("btnGpx");
let comunidad = document.getElementById("comunidad");
let provincia = document.getElementById("provincia");
let categoria = document.getElementById("categoria");
let distancia = document.getElementById("distancia");
let nombre = document.getElementById("nombre");
let date = document.getElementById("date");

let coordenadas = [];

//Variables validaciòn
let validGpx = false;
let validName = false;
let validDist = false;

// Añade listeners de eventos a elementos del formulario
nombre.addEventListener("blur", checkName);
distancia.addEventListener("blur", checkDistancia);

// Agregar listeners
formGpx.addEventListener("change", processGpx);
btnGpx.addEventListener("click", saveData);

// Función para procesar el archivo GPX
function processGpx() {
    // Obtener el archivo GPX seleccionado por el usuario
    const file = inputGPX.files[0];

    // Verificar si se seleccionó un archivo
    if (file) {
        validGpx = true;
        const fileReader = new FileReader();
        fileReader.onload = event => {
            const textContent = event.target.result;
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(textContent, "application/xml");
            const json = toGeoJSON.gpx(xmlDoc);
            const coor = json.features[0].geometry.coordinates;

            // Calcular los valores de altitud
            let altitudes = coor.map(item => item[2]);
            let values = altitudes.reduce(({ pos, neg, prev }, item) => {
                if (item < prev) pos += (prev - item);
                else neg += (item - prev);
                return { pos: pos, neg: neg, prev: item };
            }, { pos: 0, neg: 0, prev: altitudes[0] });

            // Actualizar los campos del formulario con los valores de altitud
            formGpx.elements.desnivelNeg.value = values.neg.toFixed(2);
            formGpx.elements.desnivelPos.value = values.pos.toFixed(2);
            formGpx.elements.desnivel.value = (values.pos + values.neg).toFixed(2);

            // Extraer y mostrar coordenadas, seleccionando una de cada 250

            let trkpts = xmlDoc.querySelectorAll('trkpt');

            trkpts.forEach(function (trkpt, index) {
                // Obtener latitud y longitud del punto
                let latitud = parseFloat(trkpt.getAttribute('lat'));
                let longitud = parseFloat(trkpt.getAttribute('lon'));

                // Seleccionar una de cada 250 coordenadas de manera equitativa
                if (index % 250 === 0) {
                    coordenadas.push({ lat: latitud, lon: longitud });
                }
            });
        };

        fileReader.readAsText(file);
        return coordenadas;
    }
}

function saveData(e) {
    e.preventDefault();
    //validDist && validName && validGpx
    if (validDist && validName) {
        let options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                "evento" : nombre.value,
                "distancia" : distancia.value,
                "desPos" : formGpx.elements.desnivelPos.value,
                "desNeg" : formGpx.elements.desnivelNeg.value,
                "desnivel" : formGpx.elements.desnivel.value,
                "coords" : coordenadas,
                "categoria" : formGpx.elements.categoria.value,
                "comunidad" : formGpx.elements.comunidad.value,
                "provincia" : formGpx.elements.provincia.value,
                "date" : formGpx.elements.date.value,
            }),
        };

        fetch(url, options)
            .then(response => {
                if (response.status == 200) {
                    alert("Evento creado con exito!!")
                    return response.json();
                } else {
                    throw new Error("Error al guardar los datos.");
                }
                
            })
            .then( data => {
                console.log(data);
                location.href = "../html/rutas.html";
            })
    }else{
        alert("Datos no validos")
    }
}


function checkName(e) {
    e.preventDefault();
    // Expresión regular para verificar si solo hay letras (mayúsculas o minúsculas) y espacios
    const regex = /^[a-zA-Z\s]+$/;
    const name = e.target.value.trim(); // Obtener el valor del campo de entrada y eliminar los espacios en blanco al principio y al final
    
    if (regex.test(name)) {
        validName = true;
    } else {
        validName = false;
        console.log("No name");
    }
}

function checkDistancia(e) {
    e.preventDefault();
    // Expresión regular para verificar si solo hay dígitos del 0 al 9
    const regex = /^\d+$/;
    const distancia = e.target.value.trim(); // Obtener el valor del campo de entrada y eliminar los espacios en blanco al principio y al final
    
    if (regex.test(distancia)) {
        validDist = true;
    } else {
        validDist = false;
        console.log("No dist");
    }
}


// Mostrar datos correspondientes a las comunidades en el elemento "comunidad" del formulario
comunidades2.forEach(elem => {
    let option = document.createElement("option");
    option.value = elem.comunidad;
    option.textContent = elem.comunidad;
    comunidad.appendChild(option);
});

// Agregar un escuchador de eventos al cambio en el elemento "comunidad"
comunidad.addEventListener("change", (e) => {
    e.preventDefault();
    provincia.innerHTML = "";
    cargarComunidad();
});

// Función para cargar provincias basadas en la comunidad seleccionada
function cargarComunidad() {
    comunidades2.forEach(elem => {
        if (elem.comunidad == comunidad.value) {
            elem.provincias.forEach(elem => {
                // Crear opciones para las provincias
                let option = document.createElement("option");
                option.value = elem.provincia;
                option.textContent = elem.provincia;
                // Agregar la opción al elemento "provincia"
                provincia.appendChild(option);
            });
        }
    });
}

cargarComunidad();