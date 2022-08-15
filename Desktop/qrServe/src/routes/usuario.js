const {Router} = require('express');
const router = Router();
const usuario = require('../models/usuario');

//----------------------Captura de usuarios----------------------
//Interfaz de captura de usuario
router.get('/api/capturar', (req, res) => {    
    res.render('capturar');
});

//Método para capturar usuarios
router.post('/api/capturar', async (req, res) => {

    //Objeto automovil
    const automovil = {matricula: req.body.matricula, marca: req.body.marca, modelo: req.body.modelo, ano: req.body.ano};

    //Objeto usuario
    const usuarioCap = new usuario();
    usuarioCap.expediente = req.body.expediente;
    usuarioCap.nombre = req.body.nombre;
    usuarioCap.area = req.body.area;
    usuarioCap.departamento = req.body.departamento;
    usuarioCap.imagen = '/img/' + req.file.filename;
    usuarioCap.automovil = automovil;

    //Guardar objeto usuario
    await usuarioCap.save();
    res.render('capturar');
});

//----------------------Visualización de todos los usuarios----------------------
//Interfaz para visualizar todos los usuarios
router.get('/api/usuarios', async (req, res) => {
    const usuarios = await usuario.find();
    res.render("usuarios", {usuarios:usuarios});
});

//Interfaz para visualizar un usuario
router.get('/api/usuario/:expediente', async (req, res) => {
    const { expediente } = req.params;
    const usuarioEx = await usuario.find({ expediente: expediente });
    res.render("usuario", {usuario: usuarioEx});
});


//----------------------Acceso de usuarios----------------------
//Interfaz para capturar entrada de usuarios
router.get('/api/entrada', async(req, res) => {
    res.render('entrada');
});

//Método para registrar entradad de usuarios
router.post('/api/entrada', async(req, res) => {

    const expediente = req.body.expediente;
    const fecha = req.body.fecha.toString();

    await usuario.findOneAndUpdate({ expediente: expediente }, {$push: {acceso: fecha}});

    res.render('entrada');

    });

module.exports = router;