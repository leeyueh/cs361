module.exports = function(){
    var express = require('express');
    var router = express.Router();

    router.post('/', function (req, res) {
        var mysql = req.app.get('mysql');



	var sql = "UPDATE Customers SET first_name=?, last_name=?, phone=?, email=?, street=?, city=?, state=?, zip_code=? WHERE customer_id=?";
        var inserts = [req.body.first_name, req.body.last_name, req.body.phone, req.body.email, req.body.street, req.body.city, req.body.state, req.body.zip_code, req.body.customer_id];
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
