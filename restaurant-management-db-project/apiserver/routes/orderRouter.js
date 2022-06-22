const express = require('express');
const bodyParser = require('body-parser');
const db = require('../mysql');
const orderRouter = express.Router();

orderRouter.use(bodyParser.json());
orderRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    console.log('Order req : ' + req.params);
    db.query('Call getOrders(?)',[req.body.id], (err, rows) => {
        if (err)
        {
            return res.end(err);
        }
        else
            res.json(rows);
    });
})
.post((req, res, next) => {
    db.query('Call getOrders(?)',[req.body.id], (err, rows) => {
        if (err)
        {
            return res.end(err);
        }
        else
            res.json(rows);
    });
   /* db.query('Call postOrder(?, ?)', [cid, req.body.total], (err) => {
        if (err)
        {
            console.log(err);
            return res.end(err);
        }
        else
            res.end('Succesfully added order');
    })*/
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /orders');
})
.delete((req, res, next) => {
    db.query('Delete from orders where cid = ?', [req.body.id], (err) => {
        if (err)
        {
            console.log(err);
            return res.end(err);
        }
        else
            res.end('Deleted all orders');
    })
});

orderRouter.route('/:orderId')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    db.query('Select * from orders where cid = ? and oid = ?', [req.body.id, req.params.orderId], (err, rows) => {
        if (err)
        {
            console.log(err);
            return res.end(err);
        }
        else
            res.json(rows);
    });
})
.post((req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /orders/'+ req.params.dishId);
})
.put((req, res, next) => {
  res.write('Updating the order: ' + req.params.dishId + '\n');
  res.end('Will update the order: ' + req.body.name + 
        ' with details: ' + req.body.description);
})
.delete((req, res, next) => {
    db.query('Delete from orders where id = ?', [req.params.orderId], (err) => {
        if (err)
        {
            console.log(err);
            return res.end(err);
        }
        else
            res.end('Deleted all orders');
    })});
module.exports = orderRouter;