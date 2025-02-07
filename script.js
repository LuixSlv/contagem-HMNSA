document.addEventListener("DOMContentLoaded", function() {
    atualizarListaRegistros();
});

function atualizarListaRegistros() {
    let registros = JSON.parse(localStorage.getItem("registros")) || [];
    let lista = document.getElementById("lista-registros");
    lista.innerHTML = "";

    registros.forEach((registro, index) => {
        let item = document.createElement("li");

        // Nome do registro
        let nomeRegistro = document.createElement("span");
        nomeRegistro.textContent = registro.nome;

        // Ícone de renomeação
        let iconeEditar = document.createElement("span");
        iconeEditar.textContent = "✏️";
        iconeEditar.style.cursor = "pointer";
        iconeEditar.addEventListener("click", function() {
            // Ativa o campo de texto para renomear
            let inputNome = document.createElement("input");
            inputNome.type = "text";
            inputNome.value = registro.nome;
            inputNome.addEventListener("change", function() {
                registro.nome = inputNome.value;
                localStorage.setItem("registros", JSON.stringify(registros));
                atualizarListaRegistros();
            });
            item.innerHTML = ''; // Limpa o item atual
            item.appendChild(inputNome);
            item.appendChild(botaoExcluir);
        });

        // Botão de exclusão
        let botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.addEventListener("click", function() {
            registros.splice(index, 1);
            localStorage.setItem("registros", JSON.stringify(registros));
            atualizarListaRegistros();
        });

        item.appendChild(nomeRegistro);
        item.appendChild(iconeEditar);
        item.appendChild(botaoExcluir);
        lista.appendChild(item);

        // Redireciona para a página da contagem ao clicar no nome do registro
        nomeRegistro.addEventListener("click", function() {
            localStorage.setItem("contagem-atual", JSON.stringify(registro.dados));
            window.location.href = "contador.html";
        });
    });
}

function novaContagem() {
    window.location.href = "contador.html";
}

function imprimirContagem() {
    window.print();  // Função padrão para imprimir a página
}
