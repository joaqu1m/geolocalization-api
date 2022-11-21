var express = require("express")
var router = express.Router()
var sql = require('mssql')

router.get("/selecionar", function (req, res) {
    var instrucao = `select idTotem as fkTotem from Totem`

    conexaoBanco(instrucao)
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

router.post("/inserir", function (req, res) {
    var lat = req.body.latitude
    var lng = req.body.longitude
    var precisao = req.body.precisao
    var dia = req.body.dia
    var hora = req.body.hora
    var fkTotem = req.body.fkTotem

    var instrucao = `INSERT INTO geolocalizationLeitura (latitude, longitude, precisao, dia, hora, fkTotem) VALUES ('${lat}', '${lng}', '${precisao}', '${dia}', '${hora}', '${fkTotem}')`
    console.log("Executando a instrução SQL: \n" + instrucao)

    conexaoBanco(instrucao)
    .then(
        function (resultado) {
            res.json(resultado)
        }
    ).catch(
        function (erro) {
            console.log(erro)
            console.log(
                "\nHouve um erro no banco! Erro: ",
                erro.sqlMessage
            )
            res.status(500).json(erro.sqlMessage)
        }
    )
})

function conexaoBanco(instrucao) {
    return new Promise(function (resolve, reject) {
        sql.connect({
            server: "XXXXXXX.database.windows.net",
            database: "db",
            user: "user",
            password: "password",
            pool: {
                max: 10,
                min: 0,
                idleTimeoutMillis: 30000
            },
            options: {
                encrypt: true,
            }
        }).then(function () {
            return sql.query(instrucao)
        }).then(function (resultados) {
            console.log(resultados)
            resolve(resultados.recordset)
        }).catch(function (erro) {
            // TODO: Mandar esse erro lá pro HTML pra poder diferenciar o "acesso ao banco negado" do "erro no insert"
            reject(erro)
            console.log('ERRO: ', erro)
        })
        sql.on('error', function (erro) {
            return ("ERRO NO SQL SERVER (Azure): ", erro)
        })
    })
}
module.exports = router