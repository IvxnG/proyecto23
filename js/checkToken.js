function checkToken() {
    const tokenStartTime = parseInt(localStorage.getItem('tokenStartTime'));
    const currentTime = new Date().getTime();
    const tokenExpirationTime = 30 * 60 * 1000;

    if (!tokenStartTime) {
        localStorage.setItem('tokenStartTime', currentTime.toString());
    } else {
        if (currentTime - tokenStartTime > tokenExpirationTime) {
            const renewToken = confirm('Su sesión va a caducar. ¿Desea renovarla?');

            if (renewToken) {
                fetch("http://localhost:3333/api/auth/token")
                .then( response => {
                    if(response.status === 200){
                        return response.json()
                    }
                })
                .then( data => {
                    localStorage.removeItem("token");
                    localStorage.setItem("token", data.token);
                    localStorage.setItem('tokenStartTime', currentTime.toString());
                    alert('Sesion renovada');
                })
                
            } else {
                logoutUser();
            }
        }
    }
}

function logoutUser() {
    alert('Sesión cerrada automáticamente!');
    localStorage.clear();
    location.href = 'http://127.0.0.1:5500/';
}

if (localStorage.getItem('token')) {
    document.addEventListener("DOMContentLoaded", function() {
        checkToken();
    });
}