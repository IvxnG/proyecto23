
if (localStorage.getItem("token")) {

}

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