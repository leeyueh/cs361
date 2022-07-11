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

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        var mysql = req.app.get('mysql');
        let query1;
        if (req.query.itemID === undefined)
        {
        getItems(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('items', context);
            }
}

        }
        else
        {
	    query1 = `SELECT * FROM Order_items WHERE item_id = '${req.query.itemID}%'`
            mysql.pool.query(query1, function(error, rows, fields){
                context.items = rows;
                return res.render('items', context);
            })
        }

    });

    


    function searchItemID(res, mysql, context, complete){
        mysql.pool.query("SELECT item_id FROM Order_items WHERE item_id = '${req.query.itemID}%'", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
		res.end();
            }
            context.items = results;
            complete();
        });
    }; 
    






    router.post('/', function (req, res) {
        var mysql = req.app.get('mysql');

        var sql = "INSERT INTO Order_items (item_id, quantity, price, discount) VALUES (?,?,?,?)";
        var inserts = [req.body.item_id, req.body.quantity, req.body.price, req.body.discount];

        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/items');
            }
        });
    });
    
    return router;
}();