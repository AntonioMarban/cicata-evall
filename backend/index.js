const express = require('express');
const cors = require('cors')
const app = express();
const port = process.env.BACKEND_PORT | 3000;
require('dotenv').config(); 


const login = require('./src/routes/login')

const researchers = require('./src/routes/researcher')

const committeeMember = require('./src/routes/committeeMember');

app.use(cors())

app.use(express.json());


app.use('/',login)
app.use('/researchers', researchers)
app.use('/', committeeMember);



app.get("/", (req, res) =>{
    res.send("Te estoy viendao")
})

// Iniciar el servidor
app.listen(port, () =>{
    console.log(`Servidor en el puerto ${port}`)
})


