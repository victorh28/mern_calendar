

const mongoose = require('mongoose');

const dbConnection = async() =>{

    console.log(process.env.DB_CNN);

    try {
        await mongoose.connect(process.env.DB_CNN, {
             useNewUrlParser: true, 
             useUnifiedTopology: true,
             useCreateIndex: true
            });

            console.log('Conexion con db establecida..');

    } catch (error) {
        console.log(error);
        throw new Error('Error de conexion.. no jada mas..');
    }
}



module.exports = {
    dbConnection
}