Aplicacion que crea un servidor web

mlab.com : sitio en el que esta la base de datos en mongo.

heroku: https://mighty-beach-27933.herokuapp.com/

robo 3t: herramienta para conectarnos a MongoDB

para correr la app:
```nodemon server/server```

En heroku configuramos las variables de entorno (conexion bd)
```heroku config:set nombre="xxxxx" ```
```heroku config:get nombre```
```heroku config:unset nombre```

Para la validacion de JWT:
https://jwt.io/

//Parseo de jwt (alg: HS256)
function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
};

Paquete en node para manejo de jwt:
npm jsonwebtoken