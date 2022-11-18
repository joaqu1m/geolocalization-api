var express = require("express")
var router = express.Router()
var database = require("./conexao")

// lembrando que router.get é select e router.post é insert
router.post("/inserir", function (req, res) {
    var nome = req.body.nomeServer
    var email = req.body.emailServer
    var tel = req.body.telServer
    var senha = req.body.senhaServer

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!")
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!")
    } else if (tel == undefined) {
        res.status(400).send("Seu telefone está undefined!")
    } else if (senha == undefined) {
            res.status(400).send("Sua senha está undefined!")
    } else {
        var instrucao = `INSERT INTO Usuario (nome, email, tel, senha) VALUES ('${nome}', '${email}', '${tel}', '${senha}')`
        console.log("Executando a instrução SQL: \n" + instrucao)
        database.executar(instrucao)
        .then(
            function (resultado) {
                res.json(resultado)
            }
        ).catch(
            function (erro) {
                console.log(erro)
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                )
                res.status(500).json(erro.sqlMessage)
            }
        )
    }
})

router.get("/selecionar", function (req, res) {
    var instrucao = `SELECT * FROM Usuario`
    console.log("Executando a instrução SQL: \n" + instrucao)
    database.executar(instrucao)
    .then(
        function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado)
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(
        function (erro) {
            console.log(erro)
            console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage)
            res.status(500).json(erro.sqlMessage)
        }
    )
})

router.get("/selecionar/:valores", function (req, res) {
    var valoresRecebidos = req.params.valores
    console.log(valoresRecebidos)

    var instrucao = `SELECT * FROM Usuario`
    console.log("Executando a instrução SQL: \n" + instrucao)
    database.executar(instrucao)
    .then(
        function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado)
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(
        function (erro) {
            console.log(erro)
            console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage)
            res.status(500).json(erro.sqlMessage)
        }
    )
})

module.exports = router