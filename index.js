document.addEventListener("DOMContentLoaded", function() {
    atualizarListaRegistros();
});

function atualizarListaRegistros() {
    let registros = JSON.parse(localStorage.getItem("registros")) || [];
    let lista = document.getElementById("lista-registros");
    lista.innerHTML = "";

    registros.forEach((registro, index) => {
        let item = document.createElement("li");

        // Exibição do nome, data e hora
        let nomeDiv = document.createElement("div");
        nomeDiv.textContent = registro.nome;
        let dataHoraDiv = document.createElement("div");
        dataHoraDiv.textContent = `Data: ${registro.data}`;

        // Botões de abrir, editar e excluir
        let botaoAbrir = document.createElement("button");
        botaoAbrir.textContent = "Abrir";
        botaoAbrir.addEventListener("click", function() {
            abrirContagem(registro.dados);
        });

        let botaoEditar = document.createElement("button");
        botaoEditar.textContent = "Editar";
        botaoEditar.addEventListener("click", function() {
            editarContagem(index);
        });

        let botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.addEventListener("click", function() {
            confirmarExclusao(index);
        });

        item.appendChild(nomeDiv);
        item.appendChild(dataHoraDiv);
        item.appendChild(botaoAbrir);
        item.appendChild(botaoEditar);
        item.appendChild(botaoExcluir);
        lista.appendChild(item);
    });
}

function abrirContagem(dados) {
    // Ação para abrir a contagem salva
    window.localStorage.setItem("contagemAberta", JSON.stringify(dados));
    window.location.href = "contador.html";
}

function editarContagem(index) {
    // Ação para editar o nome da contagem
    let registros = JSON.parse(localStorage.getItem("registros")) || [];
    let novoNome = prompt("Digite o novo nome para a contagem:", registros[index].nome);
    if (novoNome) {
        registros[index].nome = novoNome;
        localStorage.setItem("registros", JSON.stringify(registros));
        atualizarListaRegistros();
    }
}

function confirmarExclusao(index) {
    let confirmar = confirm("Você tem certeza que deseja excluir esta contagem?");
    if (confirmar) {
        let registros = JSON.parse(localStorage.getItem("registros")) || [];
        registros.splice(index, 1);
        localStorage.setItem("registros", JSON.stringify(registros));
        atualizarListaRegistros();
    }
}

function novaContagem() {
    window.location.href = "contador.html";
}

function imprimir() {
    let registros = JSON.parse(localStorage.getItem("registros")) || [];
    let selecao = prompt("Digite o número da contagem que você deseja imprimir (ex: 1, 2, 3...)");

    if (selecao) {
        let contagem = registros[parseInt(selecao) - 1];
        if (contagem) {
            let conteudo = `
                <h1>Contagem de Idades</h1>
                <p><strong>Nome:</strong> ${contagem.nome}</p>
                <p><strong>Data:</strong> ${contagem.data}</p>
                <table border="1">
                    <tr><th>Idade</th><th>Contagem</th></tr>
                    ${Object.keys(contagem.dados).map(idade => `
                        <tr>
                            <td>${idade}</td>
                            <td>${contagem.dados[idade]}</td>
                        </tr>
                    `).join('')}
                </table>
            `;
            let novaJanela = window.open('', '', 'width=800,height=600');
            novaJanela.document.write(conteudo);
            novaJanela.document.close();
            novaJanela.print();
        } else {
            alert("Contagem não encontrada!");
        }
    }
}
