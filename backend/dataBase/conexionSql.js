const Sequelize = require('sequelize');
require('dotenv').config()

const path = 'mysql://root:@localhost:3309/delilah_resto';
const sequelize = new Sequelize(path);
sequelize.authenticate().then(() => {
    console.log('Conectado.');
}).catch(err => {
    console.error('Error de conexion:', err);
})


module.exports = sequelize; 