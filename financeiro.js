let ganhos = [];
let gastos = [];

// Função para adicionar uma transação (ganho ou gasto)
function adicionarTransacao() {
    let descricao = document.getElementById("descricao").value.trim();
    let tipo = document.getElementById("tipo").value;
    let valor = parseFloat(document.getElementById("valor").value);
    let data = document.getElementById("data").value;

    // Verificar se todos os campos estão preenchidos corretamente
    if (descricao === "" || isNaN(valor) || data === "") {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    // Enviar a transação para o servidor
    fetch("http://localhost:3000/transacoes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ descricao, tipo, valor, data }),
    })
        .then(response => response.json())
        .then(data => {
            if (data) {
                let item = document.createElement("li");
                let checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.classList.add("checkbox");
                item.appendChild(checkbox);
                item.appendChild(document.createTextNode(` ${data.data} - ${data.descricao}: R$ ${data.valor.toFixed(2)}`));

                if (tipo === "ganho") {
                    ganhos.push({ valor, id: data.id, item, checkbox });
                    document.getElementById("lista-ganhos").appendChild(item);
                } else {
                    gastos.push({ valor, id: data.id, item, checkbox });
                    document.getElementById("lista-gastos").appendChild(item);
                }

                atualizarSaldo();
                limparCampos();
            } else {
                console.error("Erro ao adicionar transação, resposta inesperada:", data);
            }
        })
        .catch(error => {
            console.error("Erro ao adicionar transação:", error);
        });
}

// Função para carregar transações salvas do servidor
function carregarTransacoes() {
    fetch("http://localhost:3000/transacoes")
        .then(response => response.json())
        .then(transacoes => {
            transacoes.forEach(transacao => {
                let item = document.createElement("li");
                let checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.classList.add("checkbox");
                item.appendChild(checkbox);
                item.appendChild(document.createTextNode(` ${transacao.data} - ${transacao.descricao}: R$ ${transacao.valor.toFixed(2)}`));

                if (transacao.tipo === "ganho") {
                    ganhos.push({ valor: transacao.valor, id: transacao.id, item, checkbox });
                    document.getElementById("lista-ganhos").appendChild(item);
                } else {
                    gastos.push({ valor: transacao.valor, id: transacao.id, item, checkbox });
                    document.getElementById("lista-gastos").appendChild(item);
                }
            });

            atualizarSaldo();
        })
        .catch(error => {
            console.error("Erro ao carregar transações:", error);
        });
}

// Função chamada ao carregar a página para pegar as transações salvas
window.onload = carregarTransacoes;

// Função para atualizar o saldo
function atualizarSaldo() {
    let totalGanhos = ganhos.reduce((acc, val) => acc + val.valor, 0);
    let totalGastos = gastos.reduce((acc, val) => acc + val.valor, 0);
    let saldo = totalGanhos - totalGastos;

    document.getElementById("total-ganhos").textContent = `R$ ${totalGanhos.toFixed(2)}`;
    document.getElementById("total-gastos").textContent = `R$ ${totalGastos.toFixed(2)}`;
    document.getElementById("saldo-final").textContent = `Lucro/Perda: R$ ${saldo.toFixed(2)}`;
}

// Função para excluir transações selecionadas
function excluirSelecionados() {
    // Excluir transações de ganhos
    ganhos.forEach((transacao) => {
        if (transacao.checkbox.checked) {
            // Enviar requisição DELETE para o servidor para remover a transação do banco de dados
            fetch(`http://localhost:3000/transacoes/${transacao.id}`, {
                method: "DELETE",
            })
                .then(response => response.json())
                .then(() => {
                    // Se a exclusão for bem-sucedida, remove o item do DOM
                    document.getElementById("lista-ganhos").removeChild(transacao.item);
                })
                .catch(error => {
                    console.error("Erro ao excluir transação:", error);
                });
        }
    });

    // Excluir transações de gastos
    gastos.forEach((transacao) => {
        if (transacao.checkbox.checked) {
            // Enviar requisição DELETE para o servidor para remover a transação do banco de dados
            fetch(`http://localhost:3000/transacoes/${transacao.id}`, {
                method: "DELETE",
            })
                .then(response => response.json())
                .then(() => {
                    // Se a exclusão for bem-sucedida, remove o item do DOM
                    document.getElementById("lista-gastos").removeChild(transacao.item);
                })
                .catch(error => {
                    console.error("Erro ao excluir transação:", error);
                });
        }
    });

    // Atualiza o saldo após a exclusão
    atualizarSaldo();
}

// Função para limpar os campos de entrada
function limparCampos() {
    document.getElementById("descricao").value = "";
    document.getElementById("valor").value = "";
    document.getElementById("data").value = "";
}

// Função para adicionar uma nova categoria
function adicionarNovaCategoria() {
    let novaCategoria = document.getElementById("nova-categoria").value.trim();

    if (novaCategoria === "") {
        alert("Digite um nome de categoria válido!");
        return;
    }

    // Criar o botão na lateral direita
    let categoriasBotoes = document.getElementById("categorias-botoes");
    let novoBotao = document.createElement("button");
    novoBotao.textContent = novaCategoria;

    // Adicionar um evento de clique para o novo botão (pode ser para filtrar ou qualquer outra ação)
    novoBotao.onclick = () => {
        alert(`Categoria ${novaCategoria} clicada!`);
    };

    // Adicionar o botão ao container de botões
    categoriasBotoes.appendChild(novoBotao);

    // Limpar o campo de texto
    document.getElementById("nova-categoria").value = "";
}
