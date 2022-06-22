const express = require('express');
const bodyParser = require('body-parser');
const db = require('../mysql');
const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    db.query('call menu', (err, rows) => {
        if (err)
        {
            return res.end(err);
        }
        else
        {
            console.log('Menu here : ');
            console.log(rows);
            res.json(rows);
        }
    });
})
.post((req, res, next) => {
    if(req.body.admin)
    {
        db.query('call newdish(?, ?, ?)', [req.body.price, req.body.description, req.body.type], (err) => {
            if (err)
            {
                return res.end(err);
            }
            else
                res.end('dish added!');
        })
    }
    else
        res.end('You can not post a new dish');
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})
.delete((req, res, next) => {
    res.end('can not all dishes');
});

dishRouter.route('/:dishId')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    db.query('select * from dishes where id = ?', [req.params.dishId], (err, rows) => {
        if (err)
        {
            return res.end(err);
        }
        else
            res.json(rows);
    })
})
.post((req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /dishes/'+ req.params.dishId);
})
.put((req, res, next) => {
    if(req.body.admin)
    {
        db.query('Update dishes set price = ? where id = ?', [req.body.price, req.params.dishId], (err) => {
            if(err)
            {
                return res.end(err);
            }
            else
                res.end('dish Updated!');
        })   
    }
    else
    {
        db.query('call updatedish(?,?)', [req.params.dishId, req.body.rating], (err) => {
            if (err)
            {
                return res.end(err);
            }
            else
                res.end('dish updated!');
        });
    }
})
.delete((req, res, next) => {
    if(req.body.admin)
    {
        db.query('Delete from dishes where id = ?', [req.params.dishId], (err) => {
            if(err)
            {
                return res.end(err);
            }
            else
                res.end('dish deleted!');
        });
    }
    else
        res.end('You can not delete a dish');
});

dishRouter.route('/dishes/deals')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    console.log('call for deals');
    db.query('Select * from deals', (err, rows) => {
        if (err)
        {
            return res.end(err);
        }
        else
            res.json(rows);
    });
})
.post((req, res) => {
    if(req.body.admin)
    db.query('call postDeal(?, ?, ?, ?, ?)', [req.body.description, req.body.Dishtype, req.body.price, req.body.startdate, req.body.enddate], (err) => {
        if (err)
        {
            return res.end(err);
        }
        else
            return res.end('Deal Added!');
    });
});

dishRouter.route('/deals/:dealId')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    db.query('Select price from deals where id = ?', [req.params.dealId], (err, rows) => {
        if(err)
            {
                return res.end(err);
            }
            else
                res.json(rows);
    })
})
.delete((req, res, next) => {
    if(req.body.admin)
    {
        db.query('Delete from deals where id = ?', [req.params.dealId], (err) => {
            if(err)
            {
                return res.end(err);
            }
            else
                res.end('deal deleted!');
        });
    }
    else
        res.end('You can not delete a deal');
});
module.exports = dishRouter;