const express = require("express")
const app = express()
const { dbConnection } = require("./config/config")
const router = require("./routes/tasks")

app.use(express.json());//Siempre, siempre lo ponemos
app.use(express.urlencoded({ extended: true }));//Siempre, siempre lo ponemos

app.use("/", router)

dbConnection()


const PORT = 8080

app.listen(PORT, () => 
    console.log(`La aplicación está escuchando en el puerto http://localhost:${PORT}`))