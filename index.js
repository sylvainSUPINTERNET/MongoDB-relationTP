	// index.js
const express = require('express');
const mongoose = require('mongoose');



const app = express();

//config pug

    app.set('view engine', 'pug'); //attention pug se base sur les indentation
    app.set('views', 'views'); // la clé 2 c'est le nom du dossier que l'on souhaite


    //models
    const Order = require('./models/Order.model');
    const Customer = require('./models/Customer.model');
    const Product = require('./models/Product.model');


app.get('/', function(req,res){

        Order.find().exec().then(function(orders){
            res.render(
                'index', {orders: orders}
            )
        }).catch(function(err) {
            res.render(
                'error', {message:err.message}
            )
        })

});


	mongoose.Promise = global.Promise;
    mongoose
        .connect('mongodb://localhost/market', {useMongoClient:true})
	    .then(
	        ()=>app.listen(1337, () => console.log("App start on http://localhost:1337"))
        )
