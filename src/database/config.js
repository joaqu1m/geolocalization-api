var mysql = require("mysql2")
var sql = require('mssql')

// CONEXÃO DO SQL SERVER - AZURE (NUVEM)
var sqlServerConfig = {
    server: "dbekran.database.windows.net",
    database: "dbeKran",
    user: "eKranAdm",
    password: "1sis@grupo6",
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true, // for azure
    }
}

// CONEXÃO DO MYSQL WORKBENCH (LOCAL)
var mySqlConfig = {
    host: "localhost",
    database: "geolocal",
    user: "root",
    password: "#Gf50069451842",
}

function executar(instrucao) {
    if (process.env.AMBIENTE_PROCESSO == "cloud") {
        return new Promise(function (resolve, reject) {
            sql.connect(sqlServerConfig).then(function () {
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
    } else if (process.env.AMBIENTE_PROCESSO == "local") {
        return new Promise(function (resolve, reject) {
            var conexao = mysql.createConnection(mySqlConfig)
            conexao.connect()
            conexao.query(instrucao, function (erro, resultados) {
                conexao.end()
                if (erro) {
                    reject(erro)
                }
                console.log(resultados)
                resolve(resultados)
            })
            conexao.on('error', function (erro) {
                return ("ERRO NO MySQL WORKBENCH (Local): ", erro.sqlMessage)
            })
        })
    } else {
        return new Promise(function (resolve, reject) {
            console.log("\nO AMBIENTE (cloud OU local) NÃO FOI DEFINIDO EM app.js\n")
            reject("AMBIENTE NÃO CONFIGURADO EM app.js")
        })
    }
}

module.exports = {
    executar
}