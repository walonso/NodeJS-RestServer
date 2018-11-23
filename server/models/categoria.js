const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let categoriaSchema = new Schema({
    descripcion: {
        type: String,
        required: [true, 'Descripcion es necesaria'],
        unique: true
    },
    usuario: {
        type: String,
        required: [true, 'Usuario es necesario']
    }
});


categoriaSchema.plugin(uniqueValidator, {
    message: '{PATH} debe de ser único'
})

module.exports = mongoose.model('Categoria', categoriaSchema)