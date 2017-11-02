	// index.js
const express = require('express');

const mongoose = require('mongoose');


const app = express();

app.get('/', function(req,res){ 
	res.send('Page de test')
}

mongoose.connect('mongodb://localhost/market', {useMongoClient:true}).then(()=>app.listen(1337, () => console.log("App start on http://localhost:1337")))
