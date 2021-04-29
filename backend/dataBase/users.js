const sequelize = require('../dataBase/conexionSql.js');
const bcrypt =require('bcryptjs');

const insertUser = (usuario,hash,nombre_apellido,email,telefono,direccion) => {    
   return sequelize.query(
        `INSERT INTO usertable (usuario, passHash, nombre_apellido, e_mail, telefono,direccion,es_admin) 
        VALUES('${usuario}', '${hash}','${nombre_apellido}','${email}',${telefono},'${direccion}','F')`,
        {            
            type: sequelize.QueryTypes.INSERT
        }
    ) 
    .catch(error => console.log(error))
}

const getUser = (usuario) => {    
    return sequelize.query(
        `SELECT * FROM usertable WHERE usuario = '${usuario}'`,
        { type: sequelize.QueryTypes.SELECT }
    )
    .catch(error => console.log(error))    
}





module.exports = {insertUser,getUser}