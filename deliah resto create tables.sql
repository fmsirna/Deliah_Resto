DROP DATABASE IF EXISTS delilah_resto;
CREATE DATABASE IF NOT EXISTS delilah_resto;

use delilah_resto;
CREATE TABLE usertable (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario VARCHAR (60) NOT NULL unique,
    passHash VARCHAR (60) NOT NULL,
    nombre_apellido VARCHAR (60) NOT NULL,
    e_mail VARCHAR (60) NOT NULL,
    telefono int NOT NULL,
    direccion VARCHAR (60) NOT NULL,
    es_admin VARCHAR (1) DEFAULT 'F' NOT NULL
);

use delilah_resto;

CREATE TABLE ordertable(
    id INT PRIMARY KEY AUTO_INCREMENT,
    estado VARCHAR (10) DEFAULT 'pendiente' NOT NULL,
    forma_de_pago VARCHAR (10) default 'efectivo' NOT NULL,
    usuario VARCHAR (60) NOT NULL,
    fecha  date not null
);

CREATE TABLE orderProductstable(
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_order INT NOT NULL,   
    producto VARCHAR (60) NOT NULL,
    cantidad INT NOT NULL,
    CONSTRAINT FK_orderConstraint FOREIGN KEY (id_order)
    REFERENCES ordertable (id)
);

CREATE TABLE producttable (
    id INT PRIMARY KEY AUTO_INCREMENT,
    producto VARCHAR (60) NOT NULL,
    descripcion VARCHAR (60) NOT NULL,
    precio INT NOT NULL
);


SELECT usertable.usuario, ordertable.id AS "ID PEDIDO" , 
orderProductstable.producto, producttable.descripcion, producttable.precio
FROM  usertable 
INNER JOIN ordertable ON usertable.usuario = ordertable.usuario
INNER JOIN orderProductstable ON ordertable.id = orderProductstable.id_order
INNER JOIN producttable ON orderProductstable.producto =  producttable.producto
WHERE usertable.usuario = 'pedro';


UPDATE ordertable
SET estado='entregado'
WHERE id='20'
