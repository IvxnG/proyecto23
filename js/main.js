let perfil = document.getElementById("perfil");
let rol = document.getElementById("rol");
let card_container = document.getElementById("card_container");

if (localStorage.getItem("token")) {
    perfil.innerHTML = "<span class='nav__item-text'><a href='html/perfil.html'>Perfil</a></span>";
}

if (localStorage.getItem("rol") == "organizer") {
    rol.innerHTML = "<span class='nav__item-text'><a href='html/subirRuta.html'>Subir Ruta</a></span>";
}

let options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
};

fetch(url, options)
    .then(res => {
        if (res.status == 200) {
            return res.json()
                .then(data => {
                    card_container.innerHTML = `
                                                <div class="card">
                                                    <img src="img/IVyU5Im.jpeg" alt="Race Image" class="card_image" />
                                                    <div class="card_content">
                                                        <h3 class="card_title">Race Title</h3>
                                                        <p class="card_date">Date: January 1, 2024</p>
                                                        <p class="card_location">Location: City, Country</p>
                                                    </div>
                                                </div>
                    `;
                })
        }
    })