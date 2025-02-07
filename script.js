document.addEventListener("DOMContentLoaded", function() {
    const tabelaEsquerda = document.getElementById("tabela-esquerda");
    const tabelaDireita = document.getElementById("tabela-direita");
    const listaRegistros = document.getElementById("lista-registros");

    // Preenche as tabelas de 0 a 100
    for (let i = 0; i <= 100; i++) {
        let linha = document.createElement("tr");
        let celulaIdade = document.createElement("td");
        let celulaContagem = document.createElement("td");

        celulaIdade.textContent = i;
        celulaContagem.textContent = 0;

        celulaIdade.addEventListener("click", function() {
            celulaContagem.textContent = parseInt(celulaContagem.textContent) + 1;
        });

        linha.appendChild(celulaIdade);
        linha.appendChild(celulaContagem);

        if (i <= 50) {
            tabelaEsquerda.appendChild(linha);
        } else {
            tabelaDireita.appendChild(linha);
        }
    }

    // Exibe as contagens salvas
    exibirRegistros();
});

// Função para salvar a contagem
function salvarContagem() {
    let contagem = {};
    let linhasEsquerda = document.querySelectorAll("#tabela-esquerda tr");
    let linhasDireita = document.querySelectorAll("#tabela-direita tr");

    linhasEsquerda.forEach((linha) => {
        let idade = linha.cells[0].textContent;
        let quantidade = linha.cells[1].textContent;
        contagem[idade] = quantidade;
    });

    linhasDireita.forEach((linha) => {
        let idade = linha.cells[0].textContent;
        let quantidade = linha.cells[1].textContent;
        contagem[idade] = quantidade;
    });

    let registros = JSON.parse(localStorage.getItem("registros")) || [];
    let data = new Date();
    let codigoRegistro = `registro-${Date.now()}`;  // Gera um código único para o arquivo
    let registro = {
        nome: `Registro ${data.toLocaleDateString()} ${data.toLocaleTimeString()}`,
        data: data.toISOString(),
        dados: contagem
    };

    registros.push({ codigo: codigoRegistro, ...registro });
    localStorage.setItem("registros", JSON.stringify(registros));

    // Exibe os registros na lista
    exibirRegistros();
}

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
    const registros = JSON.parse(localStorage.getItem("registros")) || [];
    const registro = registros.find(reg => reg.codigo === id);

    if (registro) {
        const tabelaContagem = document.getElementById("tabela-contagem");
        const nomeContagem = document.getElementById("nome-contagem");
        const dataHoraContagem = document.getElementById("data-hora-contagem");

        nomeContagem.textContent = registro.nome;
        dataHoraContagem.textContent = `${new Date(registro.data).toLocaleDateString()} ${new Date(registro.data).toLocaleTimeString()}`;

        // Preenche as tabelas com os dados do registro
        for (let idade in registro.dados) {
            const linha = document.createElement("tr");
            const celulaIdade = document.createElement("td");
            const celulaContagem = document.createElement("td");

            celulaIdade.textContent = idade;
            celulaContagem.textContent = registro.dados[idade];

            linha.appendChild(celulaIdade);
            linha.appendChild(celulaContagem);

            tabelaContagem.appendChild(linha);
        }

        // Exibe o botão de editar
        const editarBtn = document.getElementById("editar-nome");
        const inputNome = document.getElementById("input-nome");
        const nomeContagemContainer = document.getElementById("nome-contagem-container");
        
        editarBtn.addEventListener("click", function() {
            nomeContagemContainer.classList.toggle("edit");
            inputNome.value = nomeContagem.textContent;
        });

        inputNome.addEventListener("change", function() {
            nomeContagem.textContent = inputNome.value;
            nomeContagemContainer.classList.remove("edit");
            // Atualiza os registros com o novo nome
            registro.nome = inputNome.value;
            localStorage.setItem("registros", JSON.stringify(registros));
        });
    }
}

// Função para imprimir a contagem
function imprimirContagem() {
    const tabela = document.getElementById("tabela-contagem").outerHTML;
    const nomeContagem = document.getElementById("nome-contagem").textContent;
    const dataHoraContagem = document.getElementById("data-hora-contagem").textContent;

    const conteudoImpressao = `
        <h1>Contagem de Idades</h1>
        <p>${nomeContagem}</p>
        <p>${dataHoraContagem}</p>
        ${tabela}
    `;

    const janelaImpressao = window.open('', '', 'width=800,height=600');
    janelaImpressao.document.write(conteudoImpressao);
    janelaImpressao.document.close();
    janelaImpressao.print();
}
