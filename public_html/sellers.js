module.exports = function(){
    var express = require('express');
    var router = express.Router();

   




    function getItems(res, mysql, context, complete){
        mysql.pool.query("SELECT item_id, quantity, price, discount FROM Order_items", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.items = results;
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



    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getSellers(res, mysql, context, complete);
        getSellers(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('sellers', context);
            }

        }
    });
    



    router.post('/', function (req, res) {
        var mysql = req.app.get('mysql');

        var sql = "INSERT INTO Sellers (seller_id, seller_name, phone, email, street, city, state, zip_code, item_id) VALUES (?,?,?,?,?,?,?,?,?)";
        var inserts = [req.body.seller_id, req.body.seller_name, req.body.phone, req.body.email, req.body.street, req.body.city, req.body.state, req.body.zip_code, req.body.item_id];

        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/sellers');
            }
        });
    });
    







    return router;
}();