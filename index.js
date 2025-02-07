document.addEventListener("DOMContentLoaded", function() {
    exibirRegistros();
});

// Função para exibir os registros salvos
function exibirRegistros() {
    const listaRegistros = document.getElementById("lista-registros");
    listaRegistros.innerHTML = ''; // Limpa a lista antes de exibir

    let registros = JSON.parse(localStorage.getItem("registros")) || [];
    registros.forEach((registro) => {
        let item = document.createElement("li");
        item.innerHTML = `
            <span>${registro.nome} (${registro.codigo})</span>
            <span>${new Date(registro.data).toLocaleDateString()} ${new Date(registro.data).toLocaleTimeString()}</span>
            <button onclick="editarRegistro('${registro.codigo}')">Editar</button>
            <button onclick="excluirRegistro('${registro.codigo}')">Excluir</button>
            <button onclick="abrirRegistro('${registro.codigo}')">Abrir</button>
        `;
        listaRegistros.appendChild(item);
    });
}

// Função para adicionar uma nova contagem
function novaContagem() {
    window.location.href = "contador.html";
}

// Função para editar o nome de um registro
function editarRegistro(id) {
    let registros = JSON.parse(localStorage.getItem("registros")) || [];
    let registro = registros.find(reg => reg.codigo === id);

    let novoNome = prompt("Digite o novo nome para o registro:", registro.nome);
    if (novoNome) {
        registro.nome = novoNome;
        localStorage.setItem("registros", JSON.stringify(registros));
        exibirRegistros(); // Atualiza a lista de registros
    }
}

// Função para excluir um registro
function excluirRegistro(id) {
    if (confirm("Tem certeza que deseja excluir este registro?")) {
        let registros = JSON.parse(localStorage.getItem("registros")) || [];
        registros = registros.filter(reg => reg.codigo !== id);
        localStorage.setItem("registros", JSON.stringify(registros));
        exibirRegistros(); // Atualiza a lista de registros
    }
}

// Função para abrir um registro específico
function abrirRegistro(id) {
    window.location.href = `contador.html?id=${id}`;
}
