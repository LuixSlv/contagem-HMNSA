document.addEventListener("DOMContentLoaded", function() {
    exibirRegistros();
});

function exibirRegistros() {
    const listaRegistros = document.getElementById("lista-registros");
    listaRegistros.innerHTML = '';

    let registros = JSON.parse(localStorage.getItem("registros")) || [];
    registros.forEach((registro) => {
        let item = document.createElement("li");
        item.innerHTML = `
            <span>${registro.nome} (${registro.codigo})</span>
            <span>${new Date(registro.data).toLocaleDateString()} ${new Date(registro.data).toLocaleTimeString()}</span>
            <button onclick="abrirRegistro('${registro.codigo}')">Abrir</button>
        `;
        listaRegistros.appendChild(item);
    });
}

function novaContagem() {
    window.location.href = "contador.html";
}

function abrirRegistro(id) {
    window.location.href = `contador.html?id=${id}`;
}
