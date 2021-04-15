const {response} = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../model/Usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async(req, res = response) =>{

    const {email, password} = req.body;

   

    try {
        let usuario = await Usuario.findOne({email});
        
        if(usuario){
            return res.status(400).json({
                respuesta:false,
                msg: 'Usuario existente... no joda'
            });
        }

        usuario = new Usuario( req.body );

        const salt = bcrypt.genSaltSync();
        usuario.password =bcrypt.hashSync(password, salt);

        await usuario.save();

        const token = await generarJWT(usuario.id, usuario.name);


        res.status(201).json({
            respuesta:true,
            uid:usuario.id,
            name:usuario.name,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            respuesta:false,
            msg: 'error al grabar'
        });
    }
    

    
}

const loginUsuario = async(req, res = response) =>{

    const { email, password} = req.body;

    try {

        const usuario = await Usuario.findOne({email});
        
        if(!usuario){
            return res.status(400).json({
                respuesta:false,
                msg: 'Usuario  No existente... no joda'
            });
        }

        const validPassword = bcrypt.compareSync(password, usuario.password);

        
        if(!validPassword){
            return res.status(400).json({
                respuesta:false,
                msg: 'Contraseña No existente... no joda'
            });
        }

        const token = await generarJWT(usuario.id, usuario.name);

        res.status(200).json({
            respuesta: true,
            uid:usuario.id,
            name:usuario.name,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            respuesta:false,
            msg: 'error al grabar'
        });
    }

    
}


const revalidarToken = async (req, res = response) =>{

    const token = await generarJWT( req.uid, req.name);

    res.json({
        respuesta:true,
        token
    });
}


module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}