const {response} = require('express');
const Evento = require('../model/eventos');



const getEventos = async (req, res = response) =>{



    try {

        const evento = await Evento.find().populate('user','name');

        res.status(200).json({
            respuesta:true,
            evento
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            respuesta:false,
            msg:'no jodas mas.. y hable con admin'
        });
    }


    
}

const crearEvento = async (req, res = response) =>{


    const evento = new Evento(req.body);
    
    try {

        evento.user = req.uid;
        
        const eventoGuardado = await evento.save();


        res.status(201).json({
            respuesta:true,
            evento:eventoGuardado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            respuesta:false,
            msg:'no jodas mas.. y hable con admin'
        });
    }

   
}

const actualizarEvento = async (req, res = response) =>{

    const eventoId =  req.params.id;
    const uid =  req.uid ;

    try {

        const evento = await Evento.findById(eventoId);

        if(!evento){
            return  res.status(404).json({
                respuesta:false,
                msg:'no existes....no jodas mas..'
            });
        }

        if(evento.user.toString() !== uid){
            return  res.status(401).json({
                respuesta:false,
                msg:'sin privilegio....no jodas mas..'
            });
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, {new : true});

        res.status(201).json({
            respuesta:true,
            eventoActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            respuesta:false,
            msg:'no jodas mas.. y hable con admin'
        });
    }

   
}

const EliminarEvento = async (req, res = response) =>{

    const eventoId =  req.params.id;
    const uid =  req.uid ;

    try {

        const evento = await Evento.findById(eventoId);

        if(!evento){
            return  res.status(404).json({
                respuesta:false,
                msg:'no existes....no jodas mas..'
            });
        }

        if(evento.user.toString() !== uid){
            return  res.status(401).json({
                respuesta:false,
                msg:'sin privilegio....no jodas mas..'
            });
        }

        await Evento.findByIdAndDelete( eventoId );

       
        res.status(200).json({
            respuesta:true,
            msg:'Evento eliminado'
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            respuesta:false,
            msg:'no se pudo eliminar jodas mas.. y hable con admin'
        });
    }
}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    EliminarEvento
}