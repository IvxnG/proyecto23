// Define la URL para la solicitud GET utilizando el username almacenado en localStorage y otras URL
const url = `http://localhost:3333/api/user/username/${localStorage.getItem("username")}`;
const urlCheck = 'http://localhost:3333/api/user/check';
const urlDelete = `http://localhost:3333/api/user/username/${localStorage.getItem("username")}`;

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
  location.href = "../index.html";
}

// Función para editar los datos del usuario, comprueba que el username no exita, por si lo cambia
function editPerfil(e) {
  e.preventDefault();
  console.log("aqui edito");

  //Comprueba que los datos introducidos cumplen las expresiones regulares
  if (true) {
    // Configura las opciones para la solicitud fetch de comprobar el nombre
    let optionsPut = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: user.value.trim(),
        mail: email.value.trim(),
        pass: pass.value.trim(),
        city: city.value.trim(),
        phone: phone.value.trim(),
      }),
    };

    //Edita los datos
    fetch(url, optionsPut)
      .then(response => {
        if (response.status == 200) {
          return response.json()
        } else {
          throw new Error("Error en el registro, intentelo de nuevo.");
        }
      }).then(data => {
        console.log(data);
        alert("Datos editados con exito!")
      })
      .catch(error => {
        console.error("Error al editar tus datos:", error);
        alert("Ocurrió un error al editar tus datos.");
      });
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

  // Si el usuario escribe la palabra correctamente, confirma para borrar el usuario
  if (delete_input.value.trim() == "CONFIRMAR") {
    
    fetch(urlDelete, optionsDelete)
      .then(res => {
        console.log(res);
        // Maneja la respuesta del servidor
        if (res.status == 200) {
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          localStorage.removeItem("rol");
          alert("¡Cuenta borrada con éxito!");
          location.href = "../index.html";
        }
        // Maneja el caso en el que no existe el usuario (código 404)
        if (res.status == 404) {
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          localStorage.removeItem("rol");
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
