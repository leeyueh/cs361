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


    function getSellers(res, mysql, context, complete){
        mysql.pool.query("SELECT seller_id, seller_name, phone, email, street, city, state, zip_code, item_id FROM Sellers", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.sellers = results;
            complete();
        });
    }; 




    function getOrders(res, mysql, context, complete){
        mysql.pool.query("SELECT Orders.customer_id, Orders.order_id, DATE(Orders.order_date) as date, DATE(Orders.shipped_date) as shippdate, Customers.first_name as CustomerFirstName, Customers.last_name as CustomerLastName, Orders.order_status, Sellers.seller_name as SellerFirstName FROM Orders JOIN Customers ON Orders.customer_id = Customers.customer_id LEFT JOIN Sellers ON Orders.seller_id = Sellers.seller_id", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.orders = results;
            complete();
        });
    };  




    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
	getCustomers(res, mysql, context, complete);
        getOrders(res, mysql, context, complete);
        getSellers(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render('orders', context);
            }

        }
    });
    



    router.post('/', function (req, res) {
        var mysql = req.app.get('mysql');

        var sql = "INSERT INTO Orders (customer_id, order_date, order_status, shipped_date, seller_id) VALUES (?,?,?,?,?)";
        var inserts = [req.body.customer_id, req.body.order_date, req.body.order_status, req.body.shipped_date, req.body.seller_id];

        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/orders');
            }
        });
    });
    







    return router;
}();