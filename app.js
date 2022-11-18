process.env.AMBIENTE_PROCESSO = "local"
//process.env.AMBIENTE_PROCESSO = "cloud"

var express = require("express")
var cors = require("cors")
var path = require("path")
var PORTA = process.env.AMBIENTE_PROCESSO == "local" ? 3333 : 8080

var app = express()

var usuarioRouter = require("./src/routes/rotas")

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")))

app.use(cors())

app.use("/rotas", usuarioRouter)

app.listen(PORTA, function () {
    console.log(`Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar: http://localhost:${PORTA} \n
    Você está rodando sua aplicação em Ambiente ${process.env.AMBIENTE_PROCESSO} \r\n`)
})