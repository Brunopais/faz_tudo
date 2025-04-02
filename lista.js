// Função para carregar as tarefas do Local Storage
function carregarTarefas() {
    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    let lista = document.getElementById("lista-tarefas");
    lista.innerHTML = ""; // Limpa a lista antes de adicionar novas tarefas

    tarefas.forEach((tarefa, index) => {
        let item = document.createElement("li");

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = tarefa.concluida;
        checkbox.style.marginRight = "10px";

        let texto = document.createElement("span");
        texto.textContent = tarefa.texto;
        if (tarefa.concluida) {
            texto.style.textDecoration = "line-through"; // Se a tarefa foi concluída, risca o texto
        }

        checkbox.addEventListener("change", function () {
            tarefa.concluida = checkbox.checked;
            if (tarefa.concluida) {
                texto.style.textDecoration = "line-through"; // Risca o texto
            } else {
                texto.style.textDecoration = "none"; // Remove o risco do texto
            }
            salvarTarefas(tarefas); // Atualiza o Local Storage
        });

        let botaoRemover = document.createElement("button");
        botaoRemover.textContent = "Excluir";
        botaoRemover.onclick = function () {
            tarefas.splice(index, 1); // Remove a tarefa da lista
            salvarTarefas(tarefas); // Atualiza o Local Storage
            carregarTarefas(); // Atualiza a lista
        };

        item.appendChild(checkbox);
        item.appendChild(texto);
        item.appendChild(botaoRemover);
        lista.appendChild(item);
    });
}

// Função para adicionar tarefa
function adicionarTarefa() {
    let tarefaInput = document.getElementById("tarefa");
    let tarefaTexto = tarefaInput.value.trim();

    if (tarefaTexto !== "") {
        let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

        // Adiciona a nova tarefa
        tarefas.push({ texto: tarefaTexto, concluida: false });

        salvarTarefas(tarefas); // Atualiza o Local Storage
        tarefaInput.value = ""; // Limpa o campo de entrada
        carregarTarefas(); // Atualiza a lista de tarefas
    }
}

// Função para salvar as tarefas no Local Storage
function salvarTarefas(tarefas) {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// Carregar as tarefas ao iniciar
document.addEventListener("DOMContentLoaded", carregarTarefas);
