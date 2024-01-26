let perfil = document.getElementById("perfil");

if( localStorage.getItem("token") ){
    perfil.innerHTML = "<span class='nav__item-text'><a href='html/perfil.html'>Perfil</a></span>";
}