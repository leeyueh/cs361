module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getCustomers(res, mysql, context, complete){
        mysql.pool.query("SELECT customer_id, first_name, last_name, phone, email, street, city, state, zip_code FROM Customers", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.customers = results;
            complete();
        });
    };    

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getCustomers(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('customers', context);
            }

        }
    });
    



    router.post('/', function (req, res) {
        var mysql = req.app.get('mysql');

        var sql = "INSERT INTO Customers (customer_id, first_name, last_name, phone, email, street, city, state, zip_code) VALUES (?,?,?,?,?,?,?,?,?)";
        var inserts = [req.body.customer_id, req.body.first_name, req.body.last_name, req.body.phone, req.body.email, req.body.street, req.body.city, req.body.state, req.body.zip_code];

        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/customers');
            }
        });
    });
    







    return router;
}();