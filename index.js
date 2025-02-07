document.addEventListener("DOMContentLoaded", function() { 
    atualizarListaRegistros();
});

function atualizarListaRegistros() {
    let registros = JSON.parse(localStorage.getItem("registros")) || [];
    let lista = document.getElementById("lista-registros");
    lista.innerHTML = "";

    registros.forEach((registro, index) => {
        let item = document.createElement("li");
        
        let textoNome = document.createElement("span");
        textoNome.textContent = registro.nome;
        
        let iconeRenomear = document.createElement("button");
        iconeRenomear.textContent = "✏️";
        iconeRenomear.addEventListener("click", function() {
            let inputNome = document.createElement("input");
            inputNome.type = "text";
            inputNome.value = registro.nome;
            inputNome.addEventListener("blur", function() {
                registro.nome = inputNome.value;
                localStorage.setItem("registros", JSON.stringify(registros));
                atualizarListaRegistros();
            });
            item.replaceChild(inputNome, textoNome);
            inputNome.focus();
        });

        let botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.addEventListener("click", function() {
            registros.splice(index, 1);
            localStorage.setItem("registros", JSON.stringify(registros));
            atualizarListaRegistros();
        });

        let botaoAbrirContagem = document.createElement("button");
        botaoAbrirContagem.textContent = "Abrir";
        botaoAbrirContagem.addEventListener("click", function() {
            window.location.href = `contador.html?id=${index}`;
        });

        item.appendChild(textoNome);
        item.appendChild(iconeRenomear);
        item.appendChild(botaoAbrirContagem);
        item.appendChild(botaoExcluir);
        lista.appendChild(item);
    });
}

function novaContagem() {
    window.location.href = "contagem.html";
}

function imprimirContagens() {
    let registros = JSON.parse(localStorage.getItem("registros")) || [];
    let tabelaImpressao = document.createElement("table");
    let cabecalho = document.createElement("tr");
    cabecalho.innerHTML = "<th>Idade</th><th>Contagem</th>";
    tabelaImpressao.appendChild(cabecalho);

    registros.forEach(registro => {
        for (const idade in registro.dados) {
            let linha = document.createElement("tr");
            linha.innerHTML = `<td>${idade}</td><td>${registro.dados[idade]}</td>`;
            tabelaImpressao.appendChild(linha);
        }
    });

    let janela = window.open("", "", "width=800, height=600");
    janela.document.write("<html><body>");
    janela.document.write(tabelaImpressao.outerHTML);
    janela.document.write("</body></html>");
    janela.document.close();
}

