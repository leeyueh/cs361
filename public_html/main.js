/*
    Uses express, dbcon for database connection, body parser to parse form data
    handlebars for HTML templates
*/

const PORT = 9080;

var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');

var app = express();
var handlebars = require('express-handlebars').create({
        defaultLayout:'main',
        });



app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({extended:true}));
app.use('/static', express.static('public'));
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);
app.set('mysql', mysql);
app.use('/customers', require('./customers.js'));
app.use('/orders', require('./orders.js'));
app.use('/sellers', require('./sellers.js'));
app.use('/items', require('./items.js'));

app.use('/deletecustomer', require('./deleteCustomer.js'));
app.use('/deleteseller', require('./deleteSeller.js'));
app.use('/updatecustomer', require('./updateCustomer.js'));


app.use('/', express.static('public'));

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(PORT, () => {
    console.log("Express started on http://localhost:" + PORT + "; press Ctrl-C to terminate.");
});
