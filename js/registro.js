// Definición de la URL del servidor para creae el usuario
const urlRegister = 'http://localhost:3333/api/user/register';
const urlCheck = 'http://localhost:3333/api/user/check';

// Selecciona elementos del DOM
let createForm = document.querySelector(".my-form");
let btnCreate = document.getElementById("btnCreate");
let passIcon = document.getElementById("passIcon");

let user = document.getElementById("user");
let username = document.getElementById("username");
let pass = document.getElementById("password");
let email = document.getElementById("email");
let rol = document.getElementById("rol");

// Variables de validación
let validUser;
let validUsername;
let validPass;
let validEmail;

// Añade listeners de eventos a elementos del formulario
user.addEventListener("blur", checkUser);
username.addEventListener("blur", checkUsername);
email.addEventListener("blur", checkEmail);
pass.addEventListener("blur", checkPass);

passIcon.addEventListener("click", showHidePass);
btnCreate.addEventListener("click", createUser);

// Función para crear el usuario
function createUser(e) {
  e.preventDefault();

  // Obtiene valores de campos adicionales o establece un valor predeterminado si están vacíos
  let city = document.getElementById("city").value.trim() || "Sin definir";
  let club = document.getElementById("club").value.trim() || "Sin definir";
  let phone = document.getElementById("phone").value.trim() || "Sin definir";

  // Crea un objeto con los datos del usuario
  let userData = {
    name: user.value.trim(),
    username: username.value.trim(),
    mail: email.value.trim(),
    pass: pass.value.trim(),
    city: city,
    phone: phone,
    club: club,
    rol: rol.value,
  }

  // Configura las opciones para la solicitud fetch de registro
  let optionsRegister = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  };
  // Configura las opciones para la solicitud fetch de comprobar el nombre
  let optionsCheck = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify( {"username": username.value.trim()}),
  };

  // Realiza la solicitud POST solo si todos los campos son válidos
  if (validUser && validUsername && validPass && validEmail) {
    //Comprueba si el nombre esta disponible para crear la cuenta
    fetch(urlCheck, optionsCheck)
      .then(response => {
        if (response.status == 200) {
          //Si esta disponible hace el fetch para crear la cuenta
          fetch(urlRegister, optionsRegister)
            .then(res => {
              if (res.status == 200) {
                alert("Registrado con éxito!!");
                location.href = "login.html";
              }
              return res.json();
            })
            .then(response => {
              if (response.id) {
                console.log(response.name);
              } else {
                alert(response.msg);
              }
            })
        }
        if (response.status == 409) {
          alert("Nombre de usuario en uso!")
        }
        return res.json();
      })
      
  }
}


// Mostrar y ocultar la contraseña
function showHidePass(e) {
  e.preventDefault();

  // Cambia el tipo de entrada del campo de contraseña para mostrar u ocultar la contraseña
  if (pass.type == "password") {
    pass.type = "text";
  } else {
    pass.type = "password"
  }
}

// Funciones para comprobar user, username, pass y email
function checkUser(e) {
  e.preventDefault();

  // Verifica si el valor del campo de usuario cumple con la expresión regular
  if (!(/^[a-zA-Z\s']+$/.test(user.value.trim()))) {
    document.getElementById("userIcon").setAttribute("stroke", "red")
    validUser = false;
  } else {
    document.getElementById("userIcon").setAttribute("stroke", "currentColor")
    validUser = true;
  }
}

function checkUsername(e) {
  e.preventDefault();

  // Verifica si el valor del campo de nombre de usuario cumple con la expresión regular
  if (!(/^[a-zA-Z0-9_]{3,16}$/.test(username.value.trim()))) {
    document.getElementById("usernameIcon").setAttribute("stroke", "red")
    validUsername = false;
  } else {
    document.getElementById("usernameIcon").setAttribute("stroke", "currentColor")
    validUsername = true;
  }
}

function checkEmail(e) {
  e.preventDefault();

  // Verifica si el valor del campo de correo electrónico cumple con la expresión regular
  if (!(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value.trim()))) {
    document.getElementById("mailIcon").setAttribute("stroke", "red")
    validEmail = false;
  } else {
    document.getElementById("mailIcon").setAttribute("stroke", "currentColor")
    validEmail = true;
  }
}

function checkPass(e) {
  e.preventDefault();

  // Verifica si el valor del campo de contraseña cumple con la expresión regular
  if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{10,}$/.test(pass.value.trim()))) {
    document.getElementById("passIcon").setAttribute("stroke", "red")
    validPass = false;
  } else {
    document.getElementById("passIcon").setAttribute("stroke", "currentColor")
    validPass = true;
  }
}