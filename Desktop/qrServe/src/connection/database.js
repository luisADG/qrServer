const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/qrDataBase')
    .then(db => console.log("DB conectada"));