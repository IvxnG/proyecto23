if(localStorage.getItem("token") || localStorage.getItem("username") || localStorage.getItem("rol")){
  location.href = "../index.html";
}

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
let city = document.getElementById("city");
let club = document.getElementById("club");
let phone = document.getElementById("phone");

// Variables de validación
let validUser;
let validUsername;
let validPass;
let validEmail;
let validCity;
let validPhone;

passIcon.addEventListener("click", showHidePass);
btnCreate.addEventListener("click", createUser);

// Función para crear el usuario
function createUser(e) {
  e.preventDefault();


  // Crea un objeto con los datos del usuario
  let userData = {
    name: user.value.trim(),
    username: username.value.trim(),
    mail: email.value.trim(),
    pass: pass.value.trim(),
    city: city.value.trim(),
    phone: phone.value.trim(),
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
  if (validUser && validUsername && validPass && validEmail && validPhone && validCity) {
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
              } else if (res.status == 400) {
                alert("Faltan datos!");
              } else {
                throw new Error("Error en el registro, intentelo de nuevo.");
              }
              return res.json();
            })
        }
        else if (response.status == 409) {
          alert("Nombre de usuario en uso!")
        }
        else {
          throw new Error("Error en el registro, intentelo de nuevo.");
        }
        return res.json();
      })
      // .catch(error => {
      //   alert("Error en el registro, intentelo de nuevo.");
      // });
      
  } else {
    alert("Los datos introducidos no son válidos o faltan!")
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
// Función genérica de validación
function validateField(inputField, regex, iconId) {
  const inputValue = inputField.value.trim();
  const isValid = regex.test(inputValue);
  const inputIcon = document.getElementById(iconId);
  inputIcon.setAttribute("stroke", isValid ? "currentColor" : "red");
  return isValid;
}

// Función para validar el campo de usuario
function checkUser(e) {
  e.preventDefault();
  validUser = validateField(user, /^[a-zA-Z\s']+$/, "userIcon");
  if (!validUser) {
    alert("Usuario no válido. Por favor, introduce un nombre de usuario válido.");
  }
}

// Función para validar el campo de nombre de usuario
function checkUsername(e) {
  e.preventDefault();
  validUsername = validateField(username, /^[a-zA-Z0-9_\s]{3,20}$/, "usernameIcon");
  if (!validUsername) {
    alert("Apodo no válido. Por favor, introduce un apodo de usuario válido.(Minimo 3 caracteres)");
  }
}

// Función para validar el campo de correo electrónico
function checkEmail(e) {
  e.preventDefault();
  validEmail = validateField(email, /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "mailIcon");
  if (!validEmail) {
    alert("Email no válido. Por favor, introduce un email de usuario válido.");
  }
}

// Función para validar el campo de contraseña
function checkPass(e) {
  e.preventDefault();
  validPass = validateField(pass, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{10,}$/, "passIcon");
  if (!validPass) {
    alert("La contraseña entroducida no es segura.")
  }
}

// Función para validar el campo de teléfono
function checkPhone(e) {
  e.preventDefault();
  validPhone = validateField(phone, /^(?:(?:(?:\+|00)?34[\s\.-]?)?(6\d{2}[\s\.-]?\d{3}[\s\.-]?\d{3}|[789]\d{2}[\s\.-]?\d{3}[\s\.-]?\d{3}))$/, "phoneIcon");
  if (!validPhone) {
    alert("El telefono o es valido. Por favor cambialo.")
  }
}

// Función para validar el campo de ciudad
function checkCity(e) {
  e.preventDefault();
  validCity = validateField(city, /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s'-]+$/ , "cityIcon");
  if (!validCity) {
    alert("La ciudad introducida no es valida.")
  }
}

// Asociar las funciones de validación a los eventos blur de los campos de entrada
user.addEventListener("change", checkUser);
username.addEventListener("change", checkUsername);
email.addEventListener("change", checkEmail);
pass.addEventListener("change", checkPass);
phone.addEventListener("change", checkPhone);
city.addEventListener("change", checkCity);
