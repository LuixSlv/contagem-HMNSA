document.addEventListener("DOMContentLoaded", function() {
    configurarContagem();
    carregarContagemSalva();
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
}

function carregarContagemSalva() {
    let contagemSalva = JSON.parse(localStorage.getItem("contagemAberta"));
    if (contagemSalva) {
        let tabelaEsquerda = document.getElementById("tabela-esquerda");
        let tabelaDireita = document.getElementById("tabela-direita");

        Object.keys(contagemSalva).forEach(idade => {
            let quantidade = contagemSalva[idade];
            let linha = idade <= 50 ? tabelaEsquerda.querySelector(`tr:nth-child(${parseInt(idade) + 1})`) : tabelaDireita.querySelector(`tr:nth-child(${parseInt(idade) + 1})`);
            if (linha) {
                linha.cells[1].textContent = quantidade;
            }
        });
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
    window.location.href = "index.html";
}
