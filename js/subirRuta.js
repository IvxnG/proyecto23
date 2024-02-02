let inputGPX = document.getElementById("inputGPX");
let formGpx = document.getElementById("formGpx");
let btnGpx = document.getElementById("btnGpx");

let comunidad = document.getElementById("comunidad");
let provincia = document.getElementById("provincia");
let categoria = document.getElementById("categoria");

formGpx.addEventListener("change" , processGpx);
btnGpx.addEventListener("click" , saveData);

function processGpx(){

    const file = inputGPX.files[0];

    if( file ){
        const fileReader = new FileReader();
        const r = fileReader.readAsText(file);

        fileReader.onload = event => {
            const textContent = event.target.result;
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(textContent, "application/xml");
            const json = toGeoJSON.gpx(xmlDoc);
            const coor = json.features[0].geometry.coordinates;

            let altitudes = coor.map( item => item[2] );
            let values = altitudes.reduce( ({ pos, neg, prev}, item) => {
                if( item < prev) pos += ( prev - item )
                    else neg += ( item - prev )
                return { pos: pos, neg: neg, prev:item }
            },{ pos: 0, neg:0, prev:altitudes[0] });

            formGpx.elements.desnivelNeg.value = values.neg.toFixed(2)
            formGpx.elements.desnivelPos.value = values.pos.toFixed(2)
            formGpx.elements.desnivel.value = (values.pos + values.neg).toFixed(2);

            let coordenadas = [];

            // Obtener todas las coordenadas del archivo GPX
            let trkpts = xmlDoc.querySelectorAll('trkpt');

            trkpts.forEach(function(trkpt) {
                let latitud = parseFloat(trkpt.getAttribute('lat'));
                let longitud = parseFloat(trkpt.getAttribute('lon'));
                coordenadas.push({ lat: latitud, lon: longitud });
            });
            console.log(coordenadas)
            console.log(comunidad.value + " : " + provincia.value + " : " + categoria.value);
        }
    }
}

function saveData(e){
    e.preventDefault();

    console.log(formGpx.elements.desnivelNeg.value);
    console.log(formGpx.elements.desnivelPos.value);
    console.log(formGpx.elements.desnivel.value);
}




//Muestra los datos correspondiestes a las comuniaddes en el select
comunidades2.forEach(elem => {
    let option = document.createElement("option")
    option.value = elem.comunidad;
    option.textContent = elem.comunidad;
    comunidad.appendChild(option)
})

comunidad.addEventListener("click", (e) => {
    e.preventDefault()
    provincia.innerHTML = "";
    cargarComunidad();
})

function cargarComunidad() {
    comunidades2.forEach(elem => {
        if (elem.comunidad == comunidad.value) {
            elem.provincias.forEach(elem => {
                let option = document.createElement("option")
                option.value = elem.provincia;
                option.textContent = elem.provincia;
                provincia.appendChild(option)
            })

        }
    })
    console.log(comunidad.value + " : " + provincia.value);
}

cargarComunidad();

