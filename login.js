document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (usuario && usuario.email === email && usuario.senha === senha) {
        alert(`Bem-vindo, ${usuario.nome}!`);
        window.location.href = "bem-vindo.html";
    } else {
        alert("E-mail ou senha incorretos!");
    }
});
