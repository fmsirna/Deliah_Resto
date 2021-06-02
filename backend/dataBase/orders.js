const sequelize = require('../dataBase/conexionSql.js');


function insertOrder(forma_de_pago, usuario, fecha) {    
   return sequelize.query(
        `INSERT INTO ordertable (estado, forma_de_pago, usuario, fecha) 
        VALUES('pendiente', '${forma_de_pago}','${usuario}','${fecha}')`,
        {            
            type: sequelize.QueryTypes.INSERT
        }
    ) 
    .catch(error => console.log(error)) 
};

async function getOrderId (usuario) {    
    const id= await sequelize.query(
        `SELECT id FROM ordertable WHERE usuario = '${usuario}' AND estado = 'pendiente'`,
        { type: sequelize.QueryTypes.SELECT })

    return id;   
}

async function isProduct (product) {    
    const isProduct= await sequelize.query(
        `SELECT * FROM producttable WHERE producto = '${product}' `,
        { type: sequelize.QueryTypes.SELECT })
    console.log(isProduct)
    if(isProduct?.length)
    {
        return true;  
    }
    else{
        false
    }
}

const insertProductInOrder = (idOrder,producto,cantidad) => {    
  return sequelize.query(
        `INSERT INTO orderproductstable (id_order, producto, cantidad) 
        VALUES(${idOrder}, '${producto}',${cantidad})`,
        {            
            type: sequelize.QueryTypes.INSERT
        }
    ) 
    .catch(error => console.log(error))
}


const getAvailableProducts = () => {    
    return sequelize.query(
        `SELECT * FROM producttable`,
        { type: sequelize.QueryTypes.SELECT }
    )
    .catch(error => console.log(error))    
}

const getAllOrders = () => {    
    return sequelize.query(
        `SELECT usertable.usuario, ordertable.id AS "ID PEDIDO" , 
        orderProductstable.producto, producttable.descripcion, producttable.precio
        FROM  usertable 
        INNER JOIN ordertable ON usertable.usuario = ordertable.usuario
        INNER JOIN orderProductstable ON ordertable.id = orderProductstable.id_order
        INNER JOIN producttable ON orderProductstable.producto =  producttable.producto;`,
        { type: sequelize.QueryTypes.SELECT }
    )
    .catch(error => console.log(error))    
}


const getUserOrder = (usuario) => {    
    return sequelize.query(
        `SELECT usertable.usuario, ordertable.id AS "ID PEDIDO" , 
        orderProductstable.producto, producttable.descripcion, producttable.precio
        FROM  usertable 
        INNER JOIN ordertable ON usertable.usuario = ordertable.usuario
        INNER JOIN orderProductstable ON ordertable.id = orderProductstable.id_order
        INNER JOIN producttable ON orderProductstable.producto =  producttable.producto
        WHERE usertable.usuario = '${usuario}'; `,
        { type: sequelize.QueryTypes.SELECT }
    )
    .catch(error => console.log(error))    
}

const updateState = (idOrder) => {    
    return sequelize.query(
        `UPDATE ordertable
        SET estado='entregado'
        WHERE id=${idOrder}  `,
        { type: sequelize.QueryTypes.UPDATE }
    )
    .catch(error => console.log(error))    
}


function createProduct(producto, descripcion, precio) {    
    return sequelize.query(
         `INSERT INTO producttable (producto, descripcion, precio) 
         VALUES('${producto}','${descripcion}','${precio}')`,
         {            
             type: sequelize.QueryTypes.INSERT
         }
     ) 
     .catch(error => console.log(error)) 
 };

 function updateProduct(producto, descripcion, precio,idProduct) {    
    return sequelize.query(
         `UPDATE producttable SET producto = '${producto}', descripcion = '${descripcion},
         precio = '${precio}' WHERE id = ${idProduct}`,
         {            
             type: sequelize.QueryTypes.UPDATE
         }
     ) 
     .catch(error => console.log(error)) 
 };


 function deleteProduct(idProduct) {    
    return sequelize.query(
         `DELETE FROM producttable WHERE id = ${idProduct}`,
         {            
             type: sequelize.QueryTypes.UPDATE
         }
     ) 
     .catch(error => console.log(error)) 
 };


module.exports = {insertOrder,getOrderId,insertProductInOrder,getAllOrders,getUserOrder,updateState,isProduct,getAvailableProducts,
                    createProduct,updateProduct,deleteProduct}