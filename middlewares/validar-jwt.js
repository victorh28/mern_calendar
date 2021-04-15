const {response} = require('express');
const jwt = require('jsonwebtoken');

const validaJWT = (req, res=response, next) =>{

    //x-token

    const token = req.header('x-token');

    if(!token){
        res.status(401).json({
            respuesta:false,
            msg: 'No hay token.. no joda'
        });
    }

    try {

        const {uid, name} = jwt.verify(token,process.env.SECRET_JWT_SEED);
      

        req.uid = uid;
        req.name = name;

    } catch (error) {
        res.status(401).json({
            respuesta:false,
            msg: 'token no valido.. no joda'
        });
    }

    next();

}


module.exports = { validaJWT };