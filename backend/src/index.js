const express = require('express');
const cors = require('cors')
const app = express();
const pool = require('./helpers/mysql_config'); 
const port = process.env.BACKEND_PORT | 3000;
require('dotenv').config(); 


app.use(cors())

app.use(express.json());

// Obtener todas las tareas
app.get('/api/tasks', (req, res) => {
  pool.query('CALL GetAllTasks()', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results[0]);
  });
});



app.get("/", (req, res) =>{
    res.send("Te estoy viendo")
})

// Iniciar el servidor
app.listen(port, () =>{
    console.log(`Servidor en el puerto ${port}`)
})


