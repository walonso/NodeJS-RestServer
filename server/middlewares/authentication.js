const jwt = require('jsonwebtoken');
// ================
// Verificar token
// ================
let verificaToken = (req, res, next) => {

    //leer header token
    let token = req.get('token');
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido'
                }
            });
        }

        req.usuario = decoded.usuario;
        next();
    });
    /*res.json({
         token
     })*/

};

// ================
// Verificar admin role
// ================
let verificaAdmin_Role = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        res.json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        })
    }
}

module.exports = {
    verificaToken,
    verificaAdmin_Role
}