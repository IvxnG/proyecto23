const url = 'http://localhost:3000/api/auth/login';

let loginForm = document.querySelector(".my-form");
let btnLog = document.getElementById("btnLog");
let btnToken = document.getElementById("btnToken");
let btnHome = document.getElementById("btnHome");

btnLog.addEventListener("click", logUser)
btnToken.addEventListener("click", borrarToken)
function borrarToken() {
  console.log("Borrado el token");
  localStorage.removeItem("token")
}
btnHome.addEventListener("click", home);
function home() {
  location.href = '../index.html'
}

function logUser(e) {
  e.preventDefault();

  let username = document.getElementById("user");
  let pass = document.getElementById("password");

  if (username.value.length == 0) {
    alert("Introduce el nombre de usuario")
  }
  if (pass.value.length == 0) {
    alert('Introduce la contraseña')
  }

  if (username.value.length != 0 && pass.value.length != 0) {
    console.log("-----------");

    let userData = {
      username: user.value,
      pass: pass.value,
    }

    let options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    };

    console.log(userData);

    fetch(url, options)
      .then(res => {
        if (res.status == 200) {
          return res.json()
            .then(response => {
              console.log(response);
              localStorage.setItem("token", response.token);
              location.href = '../index.html';
            })
        }
        if (res.status == 401) {
          alert("Credenciales no válidas");
        }
        ;
      })

  }
}


