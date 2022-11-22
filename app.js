var express = require("express")
var cors = require("cors")
var path = require("path")

console.log(`> bibliotecas importadas com sucesso`)

var app = express()

var usuarioRouter = require("./src/query")

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")))

app.use(cors())

app.use("/query", usuarioRouter)

console.log(`> rotas definidas`)

app.listen(8080, function () {
    console.log(`> servidor do seu site já está rodando no endereço http://localhost:8080 em ambiente ${process.env.AMBIENTE_PROCESSO}`)
})