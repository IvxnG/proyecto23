const url = `http://localhost:3000/api/user/username/${localStorage.getItem("user")}`;
let data;
if (localStorage.getItem("token")) {

    let options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    fetch(url, options)
        .then(res => {
            if (res.status == 200) {
                return res.json()
                    .then(response => {
                        data = response
                        console.log(data);
                    })
            }
            // Maneja el caso en el que no existe el usuario
            if (res.status == 404) {
                alert("Usuario no existente!");
                location.href = "../index.html";
            }
        })
}
console.log(data);

let btnEdit = document.getElementById("btnEdit");
let btnCancel = document.getElementById("btnCancel");

btnCancel.addEventListener("click", goIndex);
btnEdit.addEventListener("click", editPerfil);

function goIndex(e) {
    e.preventDefault();
    location.href = "../index.html";
}

function editPerfil(e) {
    e.preventDefault();
    console.log("aqui edito");
}