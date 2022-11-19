var express = require("express")
var router = express.Router()
var sql = require('mssql')

router.post("/inserir", function (req, res) {
    var lat = req.body.latitude
    var lng = req.body.longitude
    var dia = req.body.dia
    var hora = req.body.hora
    var fkTotem = req.body.fkTotem

    var instrucao = `INSERT INTO geolocalizationLeitura (latitude, longitude, dia, hora, fkTotem) VALUES ('${lat}', '${lng}', '${dia}', '${hora}', '${fkTotem}')`
    console.log("Executando a instrução SQL: \n" + instrucao)

    new Promise(function (resolve, reject) {
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
            reject(erro)
            console.log('ERRO: ', erro)
        })
        sql.on('error', function (erro) {
            return ("ERRO NO SQL SERVER (Azure): ", erro)
        })
    })
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
})
module.exports = router