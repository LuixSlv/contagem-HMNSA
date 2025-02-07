document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const idRegistro = params.get('id');
    
    if (idRegistro !== null) {
        carregarRegistro(parseInt(idRegistro));
    } else {
        preencherTabelas();
    }
});

function preencherTabelas() {
    const tabelaEsquerda = document.getElementById("tabela-esquerda").getElementsByTagName('tbody')[0];
    const tabelaDireita = document.getElementById("tabela-direita").getElementsByTagName('tbody')[0];

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

function salvarContagem() {
    let contagem = {};
    let linhas = document.querySelectorAll("tbody tr");

    linhas.forEach(linha => {
        let idade = linha.cells[0].textContent;
        let quantidade = linha.cells[1].textContent;
        contagem[idade] = quantidade;
    });

    let registros = JSON.parse(localStorage.getItem("registros")) || [];
    let registro = {
        nome: "Contagem Salva",
        data: new Date().toISOString(),
        dados: contagem
    };

    registros.push(registro);
    localStorage.setItem("registros", JSON.stringify(registros));

    window.location.href = "index.html";
}

function carregarRegistro(index) {
    let registros = JSON.parse(localStorage.getItem("registros")) || [];
    let registro = registros[index];

    if (registro) {
        document.getElementById("nome-contagem").textContent = registro.nome;
        document.getElementById("data-hora-contagem").textContent = new Date(registro.data).toLocaleString();

        let linhas = document.querySelectorAll("tbody tr");
        linhas.forEach(linha => {
            let idade = linha.cells[0].textContent;
            if (registro.dados[idade]) {
                linha.cells[1].textContent = registro.dados[idade];
            }
        });
    }
}

function imprimirContagem() {
    window.print();
}
