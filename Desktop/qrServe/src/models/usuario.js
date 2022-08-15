const { Schema, model } = require('mongoose');

const usuario = new Schema ({
    expediente:  {type: String},
    nombre: {type: String},
    area: {type: String},
    departamento: {type: String},
    imagen: {type: String},
    automovil: [{
        matricula: {type: String},
        marca: {type: String},
        modelo: {type: String},
        ano: {type: Number}
    }],
    acceso: [{
        entrada: {type: String},
        salida: {type: String},
        comentario: {type:String}
    }]
});

module.exports = model('usuario', usuario);