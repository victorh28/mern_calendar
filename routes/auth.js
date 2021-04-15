/**
 * /api/auth
 */

const {Router} = require('express');
const {check} = require('express-validator');
const router =  Router();

const {crearUsuario, loginUsuario, revalidarToken} = require('../controller/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validaJWT } = require('../middlewares/validar-jwt');

router.post('/new',[
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('email','Debe ingresar email valido').isEmail(),
    check('password','El password debe de ser de 6 caracteres').isLength({min:6}),
    validarCampos
] ,crearUsuario);

router.post('/',[
    check('email','Debe ingresar email valido').isEmail(),
    check('password','El password debe de ser de 6 caracteres').isLength({min:6}),
    validarCampos
]
 ,  loginUsuario);

router.get('/renew',[validaJWT], revalidarToken);

module.exports = router;