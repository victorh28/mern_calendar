/**
 * /api/events
 * 
 */

 const {Router} = require('express');
 const {check} = require('express-validator');
 const router =  Router();


 const {getEventos, crearEvento, actualizarEvento, EliminarEvento} = require('../controller/events');
const { isDate } = require('../helpers/isDate');

 const { validarCampos } = require('../middlewares/validar-campos');
 const { validaJWT } = require('../middlewares/validar-jwt');

 router.use( validaJWT );

 router.get('/',[

 ],
  getEventos);


 router.post('/',[
    check('title','El title es obligatorio').not().isEmpty(),
    check('start','Fecha de inicio es obligatoria').custom(isDate),
    check('end','Fecha de fin es obligatoria').custom(isDate),
    validarCampos
 ], crearEvento);


 router.put('/:id',[
   check('title','El title es obligatorio').not().isEmpty(),
   check('start','Fecha de inicio es obligatoria').custom(isDate),
   check('end','Fecha de fin es obligatoria').custom(isDate),
   validarCampos
 ],
  actualizarEvento);


 router.delete('/:id',[

 ],
  EliminarEvento);


 module.exports = router;
