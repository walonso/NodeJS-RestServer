const express = require('express');

let { verificaToken, verificaAdmin_Role } = require('../middlewares/authentication');

let app = express();

let Categoria = require('../models/categoria');

/// mostrar todas las categorias
app.get('/categoria', verificaToken, (req, res) => {
    Categoria.find({})
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, categorias) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            };

            res.json({
                ok: true,
                categorias
            })
        })
})

/// mostrar categoria por ID
app.get('/categoria/:id', verificaToken, (req, res) => {
    //Categoria.findById();

    let id = req.params.id;
    Categoria.findById(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };
        if (!categoriaDB) {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'El ID no es valido'
                    }
                });
            };

        }

        res.json({
            ok: true,
            categoria: categoriaDB
        })
    })
})


/// crear nueva categoria
app.post('/categoria', verificaToken, (req, res) => {
    //Categoria.findById();
    //req.usuario._id;

    let body = req.body;
    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };
        if (!categoriaDB) {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            };

        }

        res.json({
            ok: true,
            categoria: categoriaDB
        })
    })
})


/// actualizar categoria
app.put('/categoria/:id', (req, res) => {
    console.log('e');
    let id = req.params.id;
    console.log(id);
    let body = req.body;
    console.log(body);
    let descCategoria = {
        descripcion: body.descripcion
    }
    console.log(descCategoria);
    Categoria.findByIdAndUpdate(id, descCategoria, { new: true, runValidators: true }, (err, categoriaDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            };
            if (!categoriaDB) {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                };

            }

            res.json({
                ok: true,
                categoria: categoriaDB
            })
        })
        //Categoria.findById();
        //req.usuario._id;
})

/// delete categoria
//solo el admin
app.delete('/categoria/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    //
    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };
        if (!categoriaDB) {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Id no existe'
                    }
                });
            };

        }

        res.json({
            ok: true,
            message: 'Categoria borrada'
        })

    })
})


module.exports = app;