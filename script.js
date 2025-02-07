document.addEventListener("DOMContentLoaded", function() {
    configurarContagem();
});

function configurarContagem() {
    const tabelaEsquerda = document.getElementById("tabela-esquerda");
    const tabelaDireita = document.getElementById("tabela-direita");

    for (let i = 0; i <= 100; i++) {
        let linha = document.createElement("tr");
        let celulaIdade = document.createElement("td");
        let celulaContagem = document.createElement("td");

        celulaIdade.textContent = i;
        celulaContagem.textContent = 0;

        // Ao clicar na célula de idade, a contagem vai aumentar
        celulaIdade.addEventListener("click", function() {
            celulaContagem.textContent = parseInt(celulaContagem.textContent) + 1;
        });

        linha.appendChild(celulaIdade);
        linha.appendChild(celulaContagem);

        // Adiciona as idades 0-50 na tabela da esquerda
        if (i <= 50) {
            tabelaEsquerda.appendChild(linha);
        } else {
            tabelaDireita.appendChild(linha);
        }
    }
}

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
    window.location.href = "index.html";  // Redireciona de volta para a página de registros
}
