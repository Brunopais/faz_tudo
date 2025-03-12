function adicionarTarefa() {
    let tarefaInput = document.getElementById("tarefa");
    let tarefaTexto = tarefaInput.value.trim();

    if (tarefaTexto !== "") {
        let lista = document.getElementById("lista-tarefas");
        let item = document.createElement("li");

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.style.marginRight = "10px";

        let texto = document.createElement("span");
        texto.textContent = tarefaTexto;

        checkbox.addEventListener("change", function () {
            if (checkbox.checked) {
                texto.style.textDecoration = "line-through";
            } else {
                texto.style.textDecoration = "none";
            }
        });

        let botaoRemover = document.createElement("button");
        botaoRemover.textContent = "Excluir";
        botaoRemover.onclick = function () {
            lista.removeChild(item);
        };

        item.appendChild(checkbox);
        item.appendChild(texto);
        item.appendChild(botaoRemover);
        lista.appendChild(item);

        tarefaInput.value = "";
    }
}
