const url = 'http://localhost:3000/api/login';

let loginForm = document.querySelector(".my-form");
let btnLog = document.getElementById("btnLog");

btnLog.addEventListener("click", logUser)

function logUser(e) {
  e.preventDefault();

  let username = document.getElementById("email");
  let pass = document.getElementById("password");

  if (username.value.length == 0) {
    alert("Introduce el nombre de usuario")
  }
  if (pass.value.length == 0) {
    alert('Introduce la contraseña')
  }

  if (username.value.length != 0 && pass.value.length != 0) {
    console.log(username.value);

    
  }

}
