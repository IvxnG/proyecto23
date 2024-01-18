const url = 'http://localhost:3000/api/user/register';

let createForm = document.querySelector(".my-form");
let btnCreate = document.getElementById("btnCreate");
let statusMsg;

btnCreate.addEventListener("click", createUser)

function createUser(e) {
  e.preventDefault();

  // let username = document.getElementById("username");
  // let user = document.getElementById("user");
  // let pass = document.getElementById("pass");
  // let email = document.getElementById("email");

  let city = document.getElementById("city");
  city = city.value.trim() || "Sin definir";

  let club = document.getElementById("club");
  club = club.value.trim() || "Sin definir";

  let phone = document.getElementById("phone");
  phone = phone.value.trim() || "Sin definir";


  let userData = {
    name: "username2",
    username: "user1157",
    mail: "email2",
    pass: "pass",
    city: city,
    phone: phone,
    club: club,
    rol: "user",
  }

  let options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  };


  fetch(url, options)
    .then(res => {
      if (res.status == 200) {
        alert("Registrado con éxito!!")
      }
      return res.json();
    })
    .then(response => {
      if ( response.id ){
        console.log(response.id);
      } else {
        console.log(response.msg);
      }
    })
}
