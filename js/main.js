document.getElementById("userForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let nombre = document.getElementById("nombre").value;
    let correo = document.getElementById("correo").value;
    
    fetch("./php/save_user.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `nombre=${nombre}&correo=${correo}`
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        document.getElementById("userForm").reset();
        loadUsers();
    });
});

function loadUsers() {
    fetch("./php/get_users.php")
    .then(response => response.json())
    .then(users => {
        let table = document.getElementById("userTable");
        table.innerHTML = "";
        users.forEach(user => {
            let row = `<tr><td>${user.id}</td><td>${user.nombre}</td><td>${user.correo}<img src="../img/editar.png" class="icon2" onclick="editUser(${user.id}, '${user.nombre}', '${user.correo}')"><img src="../img/papelera.png" class="icon" onclick="deleteUser(${user.id})"></td></tr>`;
            table.innerHTML += row;
        });
    });
}

function deleteUser(userId) {
    if (confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
        fetch("./php/delete_user.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `id=${userId}`
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            loadUsers(); // Recargar la lista de usuarios tras la eliminación
        })
        .catch(error => console.error("Error:", error));
    }
}

function editUser(id, nombre, correo) {
    document.getElementById("nombre").value = nombre;
    document.getElementById("correo").value = correo;
}

window.onload = loadUsers();