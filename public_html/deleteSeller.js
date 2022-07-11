module.exports = function(){
    var express = require('express');
    var router = express.Router();

    router.post('/:seller_id', function(req, res){
        var mysql = req.app.get('mysql');


	



        var sql = "DELETE FROM Sellers WHERE Sellers.seller_id=?";
        var inserts = [req.params.seller_id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.status(400); 
                res.end(); 
            }else {
                res.redirect('/sellers');
            }
        })
    })


    return router;
}();