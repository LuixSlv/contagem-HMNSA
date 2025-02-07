document.addEventListener("DOMContentLoaded", function() {
    const tabelaEsquerda = document.getElementById("tabela-esquerda");
    const tabelaDireita = document.getElementById("tabela-direita");

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

    // Checar se há contagem na URL (para exibir a contagem)
    const urlParams = new URLSearchParams(window.location.search);
    const registroId = urlParams.get("registro");
    if (registroId !== null) {
        mostrarContagem(registroId);
    }
});

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
    let registro = {
        nome: `Registro ${data.toLocaleDateString()} ${data.toLocaleTimeString()}`,
        data: data.toISOString(),
        dados: contagem
    };

    registros.push(registro);
    localStorage.setItem("registros", JSON.stringify(registros));

    window.location.href = "index.html";
}

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

function mostrarContagem(id) {
    const registros = JSON.parse(localStorage.getItem("registros")) || [];
    const registro = registros[id];

    if (registro) {
        const tabelaContagem = document.getElementById("tabela-contagem");
        const nomeContagem = document.getElementById("nome-contagem");
        const dataHoraContagem = document.getElementById("data-hora-contagem");

        nomeContagem.textContent = registro.nome;
        dataHoraContagem.textContent = `${new Date(registro.data).toLocaleDateString()} ${new Date(registro.data).toLocaleTimeString()}`;

        Object.keys(registro.dados).forEach(idade => {
            const linha = document.createElement("tr");
            const celulaIdade = document.createElement("td");
            const celulaContagem = document.createElement("td");

            celulaIdade.textContent = idade;
            celulaContagem.textContent = registro.dados[idade];

            linha.appendChild(celulaIdade);
            linha.appendChild(celulaContagem);

            tabelaContagem.appendChild(linha);
        });
    }
}
