let perfil = document.getElementById("perfil");
let rol = document.getElementById("rol");

if( localStorage.getItem("token") ){
    perfil.innerHTML = "<span class='nav__item-text'><a href='html/perfil.html'>Perfil</a></span>";
}

if( localStorage.getItem("rol") == "organizer" ){
    rol.innerHTML = "<span class='nav__item-text'><a href='html/subirRuta.html'>Subir Ruta</a></span>";
}