//Autores: Vasquez Miguel, Alexandra Ivana & Barandiaran Japaja, Jhossepy Alexander & Marquez Mendez, Andrea Janet.

//importacion de los modulos

//express crea un servidor facilmente
const express = require('express');
//handlebars envia datos a traves de las vistas
const exphbs = require('express-handlebars');
//path muestra las rutas segun el sistema operativo
const path = require('path');
//muestra las peticiones al servidor
const morgan = require('morgan');
//envia mensajes a traves de las vistas
const flash = require('connect-flash');
//express-session verifica el inicio de sesion
const session = require('express-session');
//passport es la estrategia de autentificacion que usara express-session
const passport = require('passport');


//Initializations
const app = express();
require('./config/passport');


/*
Es muy importante que pongan el seteo de views antes del seteo del motor porque sio les va a aparecer un error  como este:
Error: ENOENT: no such file or directory, open 'C:\Users\yo\src\views\layouts\main.hbs'
que es un error de cuando no encuentran el archivo
*/
//Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    runtimeOptions: {
        allowProtoPropertiesByDefault: true
    }
}));
app.set('view engine', '.hbs'); 

//Middlewares
app.use(morgan('dev')); 
app.use(express.urlencoded({extended: false}));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


//Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user_global = req.user || null;
    next();
});

//Routes
 app.use(require('./routes/index.routes'));
 app.use(require('./routes/user.routes'));
 app.use(require('./routes/dashboard.routes'));
 app.use(require('./routes/admin.routes'));
 app.use(require('./routes/institution.routes'));
 app.use(require('./routes/route.routes'));
 app.use(require('./routes/assessment.routes'));
 app.use(require('./routes/generatepdf.routes'));
 app.use(require('./routes/excel.routes'));

//Static Files
app.use(express.static(path.join(__dirname, 'public'))); 





module.exports = app;

