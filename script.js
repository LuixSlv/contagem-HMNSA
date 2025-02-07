document.addEventListener("DOMContentLoaded", function() {
    const tabelaEsquerda = document.getElementById("tabela-esquerda");
    const tabelaDireita = document.getElementById("tabela-direita");

    const params = new URLSearchParams(window.location.search);
    const idRegistro = params.get('id');
    
    if (idRegistro) {
        abrirRegistro(idRegistro);
    } else {
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
    }
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

    // Volta para a página inicial
    window.location.href = "index.html";
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
        const editarBtn = document.getElementById("editar-contagem");
        editarBtn.style.display = 'inline-block';
    }
}

// Função para imprimir a contagem
function imprimirContagem() {
    window.print();
}
