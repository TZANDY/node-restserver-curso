const express = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require("bcrypt");
const _ = require("underscore");

const app = express();

// me trae todos los registros --> NO ES OPTIMO!!!

/**
 * skipt (4) --- salta a los siguientes 4
 */



/***
 * 
 * Primer GET
 * 
 */
/*
app.get("/usuario", function(req, res) {

    let desde = req.query.desde || 0;

    //transformando en un numero
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    //Usando el esquema 
    // condicion aqui -> {}
    // campos para devolver -> ''

    Usuario.find({}, 'nombre email role estado google')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: true,
                    err
                });
            }

            Usuario.count({}, (err, conteo) => {
                res.json({
                    numero_registros: conteo,
                    ok: true,
                    usuarios,

                });
            });


        });
});*/


/**
 * 
 * Segundo GET
 * 
 */

app.get("/usuario", function(req, res) {

    let desde = req.query.desde || 0;

    //transformando en un numero
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    //Usando el esquema 
    // condicion aqui -> {}
    // campos para devolver -> ''

    Usuario.find({ estado: true }, 'nombre email role estado google')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: true,
                    err
                });
            }

            Usuario.count({ estado: true }, (err, conteo) => {
                res.json({
                    numero_registros: conteo,
                    ok: true,
                    usuarios,

                });
            });


        });
});

app.post("/usuario", function(req, res) {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        //usuarioDB.password = null;

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

app.put("/usuario/:id", function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ["nombre", "email", "img", "role", "estado"]);

    // run validator (valida las restricciones)
    Usuario.findByIdAndUpdate(
        id,
        body, { new: true, runValidators: true },
        (err, usuarioDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                usuario: usuarioDB
            });
        }
    );
});


app.delete("/usuario/:id", function(req, res) {
    let id = req.params.id;
    let cambiaEstado = {
        estado: false
    }
    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });
    })
});

// BORRADO DE REGISTRO FISICAMENTE -> NO RECOMENDABLE
/*
app.delete("/usuario/:id", function(req, res) {
    let id = req.params.id;
    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (usuarioBorrado === null) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });

        }
        res.json({
            ok: true,
            usuario: usuarioBorrado
        });
    })
});
*/

module.exports = app;

// if (body.nombre === undefined) {
//     res.status(400).json({
//         ok: false,
//         mensaje: 'El nombre es necesario'
//     });
// } else {

// }

// res.json({
//     persona: body
// });