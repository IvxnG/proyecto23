// Define la URL para la solicitud GET utilizando el username almacenado en localStorage y otras URL
const url = `http://localhost:3333/api/user/username/${localStorage.getItem("username")}`;
const urlCheck = 'http://localhost:3333/api/user/check';
const urlPut = `http://localhost:3333/api/user/id/${localStorage.getItem("id")}`;

//Guardo los dos formularios
let formEdit = document.getElementById("formEdit");
let formDelete = document.getElementById("formDelete");

// Obtiene referencias a los botones de la interfaz
let btnEdit = document.getElementById("btnEdit");
let btnCancel = document.getElementById("btnCancel");
let btnToken = document.getElementById("btnToken");
let btnDelete = document.getElementById("btnDelete");
let btnConfirmDelete = document.getElementById("btnConfirmDelete");
let btnCancelDelete = document.getElementById("btnCancelDelete");
let delete_input = document.getElementById("delete_input");

let validUsername = false;
let validCity = false;
let validEmail = false;
let validPass = false;
let validPhone = false;

//Icono para mostrar y ocultar la contraseña
let passIcon = document.getElementById("passIcon");
let pass = document.getElementById("password");
passIcon.addEventListener("click", showHidePass);

// Asigna eventos a los botones
btnEdit.addEventListener("click", editPerfil);
btnCancel.addEventListener("click", goIndex);
btnToken.addEventListener("click", closeSesion);
btnDelete.addEventListener("click", showDeleteForm);
btnCancelDelete.addEventListener("click", showDeleteForm);
btnConfirmDelete.addEventListener("click", deleteUser);

// Verifica si hay un token en localStorage antes de realizar la solicitud de los datos del usuario
if (localStorage.getItem("token")) {

  // Configura las opciones para la solicitud fetch
  let options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  // Realiza la solicitud fetch para rellenar el formulario con datos del usuario
  fetch(url, options)
    .then(res => {
      if (res.status == 200) {
        return res.json()
      }
      if (res.status == 404) {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("rol");
        alert("Usuario no existente!");
        location.href = "../index.html";
      }
    })
    .then(response => {
      updateFields(response);

    })
    .catch(error => {
      console.error('Error al procesar la solicitud:', error);
      alert('Ocurrió un error al procesar la solicitud.');
    });

} else {
  //redirige a la landing page si no esta logeado
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("rol");
  localStorage.removeItem("id");
  location.href = "../index.html";
}

// Función para editar los datos del usuario, comprueba que el username no exita, por si lo cambia
function editPerfil(e) {
  e.preventDefault();
  
  checkCity(e);
  checkEmail(e);
  checkPass(e);
  checkPhone(e);
  checkUsername(e);
  //Comprueba que los datos introducidos cumplen las expresiones regulares
  if (validUsername && validCity && validEmail && validPass && validPhone) {
    // Configura las opciones para la solicitud fetch de comprobar el nombre
    let optionsPut = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' , 'Authorization': `Bearer ${localStorage.getItem("token")}`},
      body: JSON.stringify({
        name: user.value.trim(),
        mail: email.value.trim(),
        pass: pass.value.trim(),
        city: city.value.trim(),
        phone: phone.value.trim(),
      }),
    };

    //Edita los datos
    fetch(urlPut, optionsPut)
      .then(response => {
        if (response.status == 200) {
          return response.json()
        } else {
          throw new Error("Error en la edición, intentelo de nuevo.");
        }
      }).then(data => {
        console.log(data);
        alert("Datos editados con exito!")
        location.href = "../index.html";
      })
      .catch(error => {
        console.error("Error al editar tus datos:", error);
        alert("Ocurrió un error al editar tus datos.");
      });
  } else {
    console.log("Datos nuevos no validos.");
  }

}

//Muestra u oculta la confirmacion para borrar la cuenta
function showDeleteForm(e) {
  e.preventDefault();

  formEdit.classList.toggle("hidden");
  formDelete.classList.toggle("hidden");
}

//Borrar la cuenta del usuario (debe tener sesion iniciada)
let optionsDelete = {
  method: 'DELETE',
};

function deleteUser(e) {
  e.preventDefault();
  console.log("borrar user e ir index");

  // Si el usuario escribe la palabra correctamente, confirma para borrar el usuario
  if (delete_input.value.trim() == "CONFIRMAR") {

    fetch(url, optionsDelete)
      .then(res => {
        console.log(res);
        // Maneja la respuesta del servidor
        if (res.status == 200) {
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          localStorage.removeItem("rol");
          localStorage.removeItem("id");
          localStorage.clear();
          alert("¡Cuenta borrada con éxito!");
          location.href = "../index.html";
        }
        // Maneja el caso en el que no existe el usuario (código 404)
        if (res.status == 404) {
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          localStorage.removeItem("rol");
          localStorage.removeItem("id");
          localStorage.clear();
          alert("¡Usuario no existente!");
          location.href = "../index.html";
        }
      })
      .catch(error => {
        console.error("Error al realizar la solicitud:", error);
        alert("Ocurrió un error al intentar borrar la cuenta.");
      });
  } else {
    alert("¡Palabra incorrecta!");
  }
}

// Función para redirigir a la página de inicio
function goIndex(e) {
  e.preventDefault();
  location.href = "../index.html";
}

// Función para borrar el token almacenado en el localStorage y cerrar sesion
function closeSesion(e) {
  e.preventDefault();
  console.log("Sesion cerrarda!");
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("rol");
  localStorage.removeItem("id");
  location.href = '../index.html';
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

function updateFields(response) {
  document.getElementById("user").value = response.name;
  document.getElementById("username").value = response.username;
  document.getElementById("email").value = response.mail;
  document.getElementById("password").value = response.pass;
  document.getElementById("city").value = response.city || "Sin definir";
  document.getElementById("phone").value = response.phone || "Sin definir";
}


let username = document.getElementById("username");
let email = document.getElementById("email");
let city = document.getElementById("city");
let club = document.getElementById("club");
let phone = document.getElementById("phone");

username.addEventListener("change", checkUsername);
email.addEventListener("change", checkEmail);
pass.addEventListener("change", checkPass);
phone.addEventListener("change", checkPhone);
city.addEventListener("change", checkCity);

function validateField(inputField, regex, iconId) {
  const inputValue = inputField.value.trim();
  const isValid = regex.test(inputValue);
  const inputIcon = document.getElementById(iconId);
  inputIcon.setAttribute("stroke", isValid ? "currentColor" : "red");
  return isValid;
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
  validCity = validateField(city, /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s'-]+$/, "cityIcon");
  if (!validCity) {
    alert("La ciudad introducida no es valida.")
  }
}

// Asociar las funciones de validación a los eventos blur de los campos de entrada
username.addEventListener("change", checkUsername);
email.addEventListener("change", checkEmail);
pass.addEventListener("change", checkPass);
phone.addEventListener("change", checkPhone);
city.addEventListener("change", checkCity);
