const jwt = require('jsonwebtoken');
const express = require('express');
const middleware = express.Router();

// LOGIN GENERA EL TOKEN Y MIDDLEWARE LO VERIFICA A TRAVES
const verifyJWT = (req, res, next) => {

    let token = req.headers['authorization']
    //Verificar el token
    if(token){
        token = token.split(' ')[1]
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err){
                //No es correcto, res.json(error)
                return res.status(403).json({mensaje: 'Token Invalido'})
            }
            else
                //SI es correcto NEXT()
                next()
        })
    }else{
        return res.status(401).send({mensaje: 'Token no proporcionado'})
    }
        
}

middleware.use(verifyJWT);

module.exports = middleware;
