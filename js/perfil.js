// Define la URL para la solicitud GET utilizando el username almacenado en localStorage y otras URL
const url = `http://localhost:3333/api/user/username/${localStorage.getItem("username")}`;
const urlCheck = 'http://localhost:3333/api/user/check'
const urlDelete = `http://localhost:3333/api/user/username/${localStorage.getItem("username")}`;

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
        // Procesa la respuesta JSON y actualiza los campos en la página
        return res.json()
          .then(response => {
            document.getElementById("user").value = response.name;
            document.getElementById("username").value = response.username;
            document.getElementById("email").value = response.mail;
            document.getElementById("password").value = response.pass;
            document.getElementById("city").value = response.city || "Sin definir";
            document.getElementById("phone").value = response.phone || "Sin definir";
            document.getElementById("club").value = response.club || "Sin definir";
          });
      }
      // Maneja el caso en el que no existe el usuario (código 404)
      if (res.status == 404) {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        alert("Usuario no existente!");
        location.href = "../index.html";
      }
    });
} else {
  //redirige a la landing page si no esta logeado
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  location.href = "../index.html";
}

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

// Asigna eventos a los botones
btnEdit.addEventListener("click", editPerfil);
btnCancel.addEventListener("click", goIndex);
btnToken.addEventListener("click", closeSesion);
btnDelete.addEventListener("click", showDeleteForm);
btnCancelDelete.addEventListener("click", showDeleteForm);
btnConfirmDelete.addEventListener("click", deleteUser);

//Icono para mostrar y ocultar la contraseña
let passIcon = document.getElementById("passIcon");
let pass = document.getElementById("password");
passIcon.addEventListener("click", showHidePass);

// Función para redirigir a la página de inicio
function goIndex(e) {
  e.preventDefault();
  location.href = "../index.html";
}

// Función para editar los datos del usuario, comprueba que el username no exita, por si lo cambia
function editPerfil(e) {
  e.preventDefault();
  console.log("aqui edito");

  //Comprueba que los datos introducidos cumplen las expresiones regulares
  if (document.getElementById("username").value.trim() != "" || document.getElementById("username").value.trim() == localStorage.getItem("username")) {
    // Configura las opciones para la solicitud fetch de comprobar el nombre
    let optionsCheck = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "username": document.getElementById("username").value.trim() }),
    };

    //Comprueba si el nombre esta disponible para crear la cuenta
    fetch(urlCheck, optionsCheck)
      .then(response => {
        if (response.status == 200) {
          //Si esta disponible hace el fetch para crear la cuenta
          console.log("Disponible");
        }
        if (response.status == 409) {
          console.log("Nombre de usuario en uso!")
        }
      })
  } else {
    console.log("test");
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

  //Si escribe la palabea de forma correcta confirma para borra el user
  if(delete_input.value.trim() == "CONFIRMAR"){
    console.log("SI");
    fetch(urlDelete, optionsDelete)
    .then(res => {
      console.log(res);
      // Maneja la respuesta del servidor
      if (res.status == 200) {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        alert("Cuenta borrada con éxito!");
        location.href = "../index.html";
      }
      // Maneja el caso en el que no existe el usuario (código 404)
      if (res.status == 404) {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        alert("Usuario no existente!");
        location.href = "../index.html";
      }
    });
  }else{
    alert("Palabra incorrecta!")
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

// Función para borrar el token almacenado en el localStorage y cerrar sesion
function closeSesion(e) {
  e.preventDefault();
  console.log("Sesion cerrarda!");
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  location.href = '../index.html';
}