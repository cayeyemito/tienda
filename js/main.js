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
            let row = `<tr><td>${user.id}</td><td>${user.nombre}</td><td>${user.correo}</td></tr>`;
            table.innerHTML += row;
        });
    });
}

/*ocument.getElementById("userForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let id = 

    fetch("./php/delete_user.php")
        

});*/

window.onload = loadUsers();