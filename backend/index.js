const express = require('express');
const cors = require('cors')
const app = express();
const port = process.env.BACKEND_PORT | 3000;
require('dotenv').config(); 

const login = require('./src/routes/login')
const researchers = require('./src/routes/researcher')
const committeeSecretary = require('./src/routes/committeeSecretary')
const committeeMember = require('./src/routes/committeeMember');

// Aumentar el tamaño máximo de los datos que se pueden enviar en una solicitud
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));


app.use(cors())

app.use(express.json());


app.use('/',login)
app.use('/researchers', researchers)
app.use('/', committeeSecretary)
app.use('/', committeeMember);



app.get("/", (req, res) =>{
    res.send("Te estoy viendao")
})

// Iniciar el servidor
app.listen(port, () =>{
    console.log(`Servidor en el puerto ${port}`)
})


