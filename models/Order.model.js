/**
 * Created by SYLVAIN on 02/11/2017.
 */
'use strict';


const mongoose = require('mongoose');

mongoose.Promise = global.Promise;


const ObjectId  = mongoose.Schema.Types.ObjectId; //permet de creer un champ qui sera un d'objectId de custommer par exemple

//pour faire une relation, il suffit d'indiquer que le champ est un ObjectId et a quelle collection cette objectid se refere

const orderSchema = new mongoose.Schema({
   dateOrdered: {
       type: Date,
       default: Date.now,
       required: true
   },
    customer: {
       type: ObjectId,
        ref: 'Customer',
        required:true
   }, //ref :Customer => signifie que c'est le model Customer qui sera regarder  pour les objectID
    products: [ //creer un tableau d'objectId provenant de Product

        //la creation d'un tableau d'objectId se basant sur la ref collection Product permet de dire que chacune de ces entrer du tableau == obectid de product
        //et donc de creer plusieur product pour cette command (relation one Command to many product)
        {
            type: ObjectId,
            ref: 'Product'
        }
    ]


});

module.exports = mongoose.model('Order', orderSchema);