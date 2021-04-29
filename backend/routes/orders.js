const express = require("express");
require('dotenv').config()
var jwt = require('jsonwebtoken');

const {insertOrder,getOrderId,insertProductInOrder,getAllOrders,getUserOrder,updateState,isProduct,getAvailableProducts
        ,createProduct,updateProduct,deleteProduct} = require ('../dataBase/orders.js');
const {authenticateJWT,authenticateJWTAdmin}= require('../middlewares/authentication.js')

const router = express.Router();

var d = new Date();
var currentDate = `${d.getFullYear()}-${d.getMonth()}-${d.getDay()}`   // to use current date to insert in sql format "yyyymmdd"


router.post('/createOrder',authenticateJWT,(req, res) => {  
    let forma_de_pago = req.body.forma_de_pago;
    let usuario = req.user.usuario;  
    let fecha = currentDate;

    insertOrder(forma_de_pago, usuario, fecha)
    .then(r => res.json({"orderID:": r[0]}))                     
    .catch(error => res.status(500).json(error))    
  })


  router.get('/userOrder',authenticateJWT, (req, res) => {      
    getUserOrder(req.user.usuario)   
    .then(resp => { res.json(resp);})
    .catch(err => res.status(500).json(err));
  })


  router.get('/allOrders',authenticateJWTAdmin, (req, res) => {  
    getAllOrders()
    .then(resp => { res.json(resp);})
    .catch(err => res.status(500).json(err));
  })

  router.put("/updateOrder", authenticateJWTAdmin,  (req, res) => {
    updateState(req.body.idOrder);
    res.json("Estado actualizado correctamente");
  });


  

router.get('/listAvailableProducts',authenticateJWT, (req, res) => {      
  getAvailableProducts()   
  .then(resp => { res.json(resp);})
  .catch(err => res.status(500).json(err));
})


router.post('/insertProductInOrder',authenticateJWT, async (req, res) => {  
  const {
      producto,cantidad,idOrder
  } = req.body        
  const validProduct= isProduct(producto)
  console.log(validProduct)  

  if(validProduct.length>0){
    insertProductInOrder(idOrder,producto,cantidad)
      .then(r => res.json("product added succesfully"))
      .catch(error => res.status(500).json(error))       
  }
  else{
      res.status(401).json("no se encuentra ese producto en stock")
  }          
})

router.post('/createProduct',authenticateJWTAdmin,(req, res) => {  
  let producto = req.body.producto;
  let descripcion = req.body.descripcion;  
  let precio = req.body.precio; 

  createProduct(producto, descripcion, precio)
  .then(r => res.json())                     
  .catch(error => res.status(500).json(error))    
})

  
router.put("/updateProduct", authenticateJWTAdmin,  (req, res) => {
  const {
    producto,descripcion,precio,idProduct
    } = req.body  

  updateProduct(producto, descripcion, precio,idProduct);
  res.json("producto actualizado correctamente");
});

router.delete("/deleteProduct", authenticateJWTAdmin,  (req, res) => {
  const {
    idProduct
    } = req.body  

    deleteProduct(idProduct);
  res.json("Estado actualizado correctamente");
});

module.exports = router;