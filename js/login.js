// Definición de la URL del servidor para la autenticación
const url = 'http://localhost:3333/api/auth/login';

// Obtención de referencias a elementos del DOM
let loginForm = document.querySelector(".my-form");
let btnLog = document.getElementById("btnLog");
let btnHome = document.getElementById("btnHome");
let passIcon = document.getElementById("passIcon");
let pass = document.getElementById("password");

// Asignación de eventos a los elementos del formulario
passIcon.addEventListener("click", showHidePass);
btnLog.addEventListener("click", logUser);
btnHome.addEventListener("click", home);

// Función para redirigir a la página principal
function home() {
  location.href = '../index.html';
}

// Función para manejar el inicio de sesión del usuario
function logUser(e) {
  e.preventDefault();
  let username = document.getElementById("user");

  // Validación para asegurarse de que se ingresen tanto el nombre de usuario como la contraseña
  if (username.value.length == 0) {
    alert("Introduce el nombre de usuario");
  }
  if (pass.value.length == 0) {
    alert('Introduce la contraseña');
  }

  // Si ambos campos tienen datos, realiza la solicitud de inicio de sesión
  if (username.value.length != 0 && pass.value.length != 0) {

    // Crea un objeto con los datos del usuario
    let userData = {
      username: username.value.trim(),
      pass: pass.value.trim(),
    }

    // Configuración de las opciones para la solicitud fetch
    let options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    };

    console.log(userData);

    // Realiza la solicitud POST para la autenticación del usuario
    fetch(url, options)
      .then(res => {
        if (res.status == 200) {
          return res.json()
        }
        // Maneja el caso en el que las credenciales no son válidas
        if (res.status == 401) {
          alert("Credenciales no válidas.");
        }
      })
      .then(response => {
        // Almacena el token en el localStorage y redirige a la página principal
        localStorage.setItem("token", response.token);
        localStorage.setItem("username", response.username);

        fetch(`http://localhost:3333/api/user/username/${response.username}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })
          .then(res => {
            if (res.status == 200) {
              return res.json()
            }
            if (res.status == 404) {
              alert("Credenciales no válidas.");
            }
            if (res.status == 401) {
              alert("Credenciales JWT ausentes.");
            }
          })
          .then(data => {
            localStorage.setItem("rol", data.rol);
            location.href = '../index.html';
          })
        
      })
      .catch(error => {
        console.error("Error al registrar:", error);
        alert("Ocurrió un error al intentar registrarte.");
      });
  }
}

// Función para mostrar u ocultar la contraseña
function showHidePass(e) {
  e.preventDefault();
  pass.type = pass.type === "password" ? "text" : "password";
  // if (pass.type == "password") {
  //   pass.type = "text";
  // } else {
  //   pass.type = "password"
  // }
}


//Depuracion !!!!!!!!!!!!borrar!!!!!!!!!!!
let users = document.getElementById("users");
users.addEventListener("click", usersAll)

function usersAll(e) {
  e.preventDefault();

  fetch('http://localhost:3333/api/user/all')
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log(data);
    })
}