let rutas = [ 
                { title: "uno" ,
                description: "Description of the race goes here. Lorem ipsum dolor sit amet...",
                date: "January 1, 2024" ,
                location: "City, Country" ,
                id: 1 
                } ,
                { title: "dos" ,
                description: "Description of the race goes here. Lorem ipsum dolor sit amet...",
                date: "January 1, 2024" ,
                location: "City, Country" , 
                id: 2
                } ,
                { title: "tres" ,
                description: "Description of the race goes here. Lorem ipsum dolor sit amet...",
                date: "January 1, 2024" ,
                location: "City, Country" , 
                id: 3
                } ,
                { title: "cuatro" ,
                description: "Description of the race goes here. Lorem ipsum dolor sit amet...",
                date: "January 1, 2024" ,
                location: "City, Country" , 
                id: 4
                } ,
                { title: "cinco" ,
                description: "Description of the race goes here. Lorem ipsum dolor sit amet...",
                date: "January 1, 2024" ,
                location: "City, Country" , 
                id: 5
                } ,
                { title: "seis" ,
                description: "Description of the race goes here. Lorem ipsum dolor sit amet...",
                date: "January 1, 2024" ,
                location: "City, Country" , 
                id: 6
                } ,
                { title: "siete" ,
                description: "Description of the race goes here. Lorem ipsum dolor sit amet...",
                date: "January 1, 2024" ,
                location: "City, Country" , 
                id: 7
                }]

let container = document.getElementById("card_container");

rutas.forEach( ruta => {
    container.innerHTML += `
                        <div class="card">
                                <div class="card_content">
                                    <h3 class="card_title">${ruta.title}</h3>
                                    <p class="card_description">${ruta.description}
                                    </p>
                                    <p class="card_date"><b>Fecha</b>: ${ruta.date}</p>
                                    <p class="card_location"><b>Ubicación</b> : ${ruta.location}</p>
                                    <form action="detalles.html" method="get" name="form_id">
                                        <input type="hidden" name="id" value="${ruta.id}">
                                        <input type="submit" value="${ruta.id}">
                                    </form>
                                </div>
                        </div>`; 
})

// <img src="" alt="Race Image" class="card_image" />
//Usar eventos y nombre de ruta , almacena ren localStorage y usar para detalles luego borrar