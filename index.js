document.addEventListener("DOMContentLoaded", function() { 
    atualizarListaRegistros();
});

function atualizarListaRegistros() {
    let registros = JSON.parse(localStorage.getItem("registros")) || [];
    let lista = document.getElementById("lista-registros");
    lista.innerHTML = "";

    registros.forEach((registro, index) => {
        let item = document.createElement("li");
        
        // Separar data e hora do nome da contagem
        let dataHora = new Date(registro.data);
        let dataHoraTexto = `${dataHora.toLocaleDateString()} ${dataHora.toLocaleTimeString()}`;

        // Nome da contagem
        let inputNome = document.createElement("input");
        inputNome.type = "text";
        inputNome.value = registro.nome;
        inputNome.setAttribute("readonly", true);

        // Botão para editar nome
        let botaoEditar = document.createElement("button");
        botaoEditar.textContent = "Editar";
        botaoEditar.addEventListener("click", function() {
            inputNome.removeAttribute("readonly");
            inputNome.focus();
        });

        // Botão de excluir
        let botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.addEventListener("click", function() {
            if (confirm("Você tem certeza que deseja excluir esta contagem?")) {
                registros.splice(index, 1);
                localStorage.setItem("registros", JSON.stringify(registros));
                atualizarListaRegistros();
            }
        });

        // Botão de abrir contagem
        let botaoAbrir = document.createElement("button");
        botaoAbrir.textContent = "Abrir";
        botaoAbrir.addEventListener("click", function() {
            window.location.href = `contador.html?registro=${index}`;
        });

        item.appendChild(inputNome);
        item.appendChild(document.createElement("br"));
        item.appendChild(document.createTextNode(dataHoraTexto)); // Mostrar data e hora
        item.appendChild(botaoEditar);
        item.appendChild(botaoExcluir);
        item.appendChild(botaoAbrir);

        lista.appendChild(item);
    });
}

function novaContagem() {
    window.location.href = "contador.html";
}
