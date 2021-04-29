const express = require("express");
require('dotenv').config()
var jwt = require('jsonwebtoken');
const bcrypt =require('bcryptjs');


const {insertUser,getUser} = require ('../dataBase/users.js');
const {authenticateJWT,authenticateJWTAdmin}= require('../middlewares/authentication.js')

const router = express.Router();

router.post('/signIn', async (req, res) => {
    const {
        usuario,contrasena,nombre_apellido,email,telefono,direccion
    } = req.body    
    const userFound = await getUser(usuario)        
    
     if(userFound.length<=0)
    {
        const hash = await bcrypt.hash(contrasena,10)       //to HASH the password
        insertUser(usuario,hash,nombre_apellido,email,telefono,direccion)
        .then(r => res.send("usuario agregado exitosamente"))
        .catch(error => res.status(500).json(error)) 
    }
    else{
        res.status(401).json("Usuario ya registrado")
    }
})

router.post('/logIn', async (req, res) => {
    const {
        usuario, contrasena
    } = req.body;
    
    const user = await getUser(usuario)        

    if(user.length>0){
        const validPass = await bcrypt.compare(contrasena,user[0].passHash)  // to decrpit the hashed password
        if (validPass)
        {
            const token = jwt.sign({
                usuario: user[0].usuario,
                e_mail: user[0].e_mail,
                admin: user[0].es_admin                  
            },process.env.SECRET_KEY);
            res.json(token);
        }
        else{
            res.status(401).json("contraseña incorrecta")
        }
    }    
    else{
        res.status(401).json("Usuario no existe")
    }     
})

router.get('/infoUser',authenticateJWT, (req, res) => {  

    res.json(req.user)
  })


module.exports = router;