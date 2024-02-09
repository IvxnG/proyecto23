// Obtener elementos del DOM
let inputGPX = document.getElementById("inputGPX");
let formGpx = document.getElementById("formGpx");
let btnGpx = document.getElementById("btnGpx");
let comunidad = document.getElementById("comunidad");
let provincia = document.getElementById("provincia");
let categoria = document.getElementById("categoria");

// Agregar escuchadores de eventos
formGpx.addEventListener("change", processGpx);
btnGpx.addEventListener("click", saveData);

// Función para procesar el archivo GPX
function processGpx() {
    // Obtener el archivo GPX seleccionado por el usuario
    const file = inputGPX.files[0];

    // Verificar si se seleccionó un archivo
    if (file) {
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
            let coordenadas = [];
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
            // Mostrar coordenadas en la consola
            console.log(coordenadas);
        };
        fileReader.readAsText(file);
    }
}

// Función para manejar datos del formulario al hacer clic en el botón
function saveData(e) {
    e.preventDefault();

    console.log("Desnivel Negativo:", formGpx.elements.desnivelNeg.value);
    console.log("Desnivel Positivo:", formGpx.elements.desnivelPos.value);
    console.log("Desnivel Total:", formGpx.elements.desnivel.value);
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
    console.log("Selección actual - Comunidad : Provincia -", comunidad.value + " : " + provincia.value);
}

cargarComunidad();