const express = require('express');
const bodyParser = require('body-parser');
const db = require('../mysql');
const customerRouter = express.Router();

customerRouter.use(bodyParser.json());
customerRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    if(req.body.admin)
    {
        db.query('Select * from customers', (err, rows) => {
            if(err)
            {
                console.log(err);
                return res.end(err);
            }
            else
                res.json(rows);
        })
    }
    else
        res.end('You can not access all customers');
})
.post((req, res, next) => {
    db.query('Select * from customers where id = ?', [req.body.id], (err, rows) => {
        if(err)
        {
            console.log(err);
        }
        else
            res.json(rows);
    })
})
.put((req, res, next) => {
    db.query('Update customers set password = ?, name = ? where id = ?', [req.body.password, req.body.name, req.body.id], (err) => {
        if (err)
        {
            console.log(err);
            return res.end(err);
        }
        else
            res.end('Updated customer');
    })
})
.delete((req, res, next) => {
    db.query('Delete from customers where id = ?', [req.body.id], (err) => {
        if (err)
        {
            console.log(err);
            return res.end(err);
        }
        else
            res.end('Deleted customer');
    })
});
customerRouter.route('/:customerId')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    console.log('customer request : ' + req.body);
    db.query('Select * from customers where id = ?', [req.params.id], (err, rows) => {
        if(err)
        {
            console.log(err);
        }
        else
            res.json(rows);
    })
})
.post((req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /customers/'+ req.params.customerId);
})
.put((req, res, next) => {
    if(req.body.admin)
    {
        db.query('Update customers set points = ? where id = ?', [req.body.points, req.params.customerId], (err) => {
            if (err)
            {
                console.log(err);
                return res.end(err);
            }
            else
                res.end('Updated customer');
        })
    }
    else
        res.end('You can not update a customer');
})
.delete((req, res, next) => {
    if(req.body.admin)
    {
        db.query('Delete from customers where id = ?', [req.params.customerId], (err) => {
            if (err)
            {
                console.log(err);
                return res.end(err);
            }
            else
                res.end('Deleted customer');
        })
    }
    else
        res.end('You can not delete customer');
});
module.exports = customerRouter;