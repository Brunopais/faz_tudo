const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

let transacoes = [];
let id = 1;

app.get("/transacoes", (req, res) => {
    res.json(transacoes);
});

app.post("/transacoes", (req, res) => {
    let novaTransacao = { id: id++, ...req.body };
    transacoes.push(novaTransacao);
    res.json(novaTransacao);
});

app.delete("/transacoes/:id", (req, res) => {
    transacoes = transacoes.filter(t => t.id !== parseInt(req.params.id));
    res.json({ message: "Transação excluída" });
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
