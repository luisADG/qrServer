const express = require('express');
const path = require('path');
const morgan = require('morgan');
const multer = require('multer');
const { join } = require('path');

//Inatilizacions
require('./connection/database');
const app = express();

//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img'),
    filename: (req, file, cb, filename) => {
        cb(null, file.originalname);
    }
});

app.use(multer({ storage: storage}).single('imagen'));

//Global variables

//Routes
app.use(require('./routes/usuario'));
app.use(require('./routes/prueba'));

//Static files

//Start server
app.listen(app.get('port'), () => {
    console.log(`Serve on port ${app.get('port')}`);
});