let inputGPX = document.getElementById("inputGPX");
let formGpx = document.getElementById("formGpx");
let btnGpx = document.getElementById("btnGpx");

formGpx.addEventListener("change" , calculateSlope);
btnGpx.addEventListener("click" , saveData);

function calculateSlope(){

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
        }
    }
}

function saveData(e){
    e.preventDefault();

    console.log(formGpx.elements.desnivelNeg.value);
    console.log(formGpx.elements.desnivelPos.value);
    console.log(formGpx.elements.desnivel.value);
}

