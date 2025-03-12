let ganhos = [];
let gastos = [];

function adicionarTransacao() {
    let descricao = document.getElementById("descricao").value.trim();
    let tipo = document.getElementById("tipo").value;
    let valor = parseFloat(document.getElementById("valor").value);
    let data = document.getElementById("data").value;

    if (descricao === "" || isNaN(valor) || data === "") {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    let item = document.createElement("li");

    // Criando o checkbox
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");
    item.appendChild(checkbox);

    item.appendChild(document.createTextNode(` ${data} - ${descricao}: R$ ${valor.toFixed(2)}`));

    if (tipo === "ganho") {
        ganhos.push({ valor, item, checkbox });
        document.getElementById("lista-ganhos").appendChild(item);
    } else {
        gastos.push({ valor, item, checkbox });
        document.getElementById("lista-gastos").appendChild(item);
    }

    atualizarSaldo();  // Atualiza os totais e o saldo
    limparCampos();    // Limpa os campos após adicionar
}

function atualizarSaldo() {
    // Somando os valores de ganhos e gastos
    let totalGanhos = ganhos.reduce((acc, val) => acc + val.valor, 0);
    let totalGastos = gastos.reduce((acc, val) => acc + val.valor, 0);
    let saldo = totalGanhos - totalGastos;

    // Atualizando os totais de ganhos, gastos e saldo
    document.getElementById("total-ganhos").textContent = `R$ ${totalGanhos.toFixed(2)}`;
    document.getElementById("total-gastos").textContent = `R$ ${totalGastos.toFixed(2)}`;
    document.getElementById("saldo-final").textContent = `Lucro/Perda: R$ ${saldo.toFixed(2)}`;
}

function excluirSelecionados() {
    // Filtrando e removendo os itens selecionados
    ganhos = ganhos.filter((transacao) => {
        if (transacao.checkbox.checked) {
            document.getElementById("lista-ganhos").removeChild(transacao.item);
            return false;
        }
        return true;
    });

    gastos = gastos.filter((transacao) => {
        if (transacao.checkbox.checked) {
            document.getElementById("lista-gastos").removeChild(transacao.item);
            return false;
        }
        return true;
    });

    // Atualiza o saldo após a exclusão
    atualizarSaldo();
}

function limparCampos() {
    // Limpa os campos de entrada após a transação
    document.getElementById("descricao").value = "";
    document.getElementById("valor").value = "";
    document.getElementById("data").value = "";
}
