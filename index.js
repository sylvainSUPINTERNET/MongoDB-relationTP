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


    //dans PUG
    // mettre des | sur une retour à la ligne sinon la variable est interprété en tant que balise HTML

app.get('/', function(req,res){

    //.populate va faire chercher dans la collection Ref (customer) les _id object du champs passer dans populate donc customer et products

        //.populate('nom du champs de otre model')
        Order.find().populate('customer products').exec().then(function(orders){
            res.render(
                'index', {orders: orders}
            )
        }).catch(function(err) {
            res.render(
                'error', {message:err.message}
            )
        })

});


    app.get('/order/:orderId', function(req,res){

        let orderId = req.params.orderId;

        Order.findById(orderId).populate('customer products')
            .exec()
            .then(order =>
            res.render('order', { order : order })

            )
    });

    app.get('/customer/:customerId', function(req,res){

        let customerId = req.params.customerId;

        Customer.findById(customerId)
            .exec()
            .then(customer =>
                res.render('customer', {customer:customer})

            )
    });


	mongoose.Promise = global.Promise;
    mongoose
        .connect('mongodb://localhost/market', {useMongoClient:true})
	    .then(
	        ()=>app.listen(1337, () => console.log("App start on http://localhost:1337"))
        )
