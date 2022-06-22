const express = require('express');
const bodyParser = require('body-parser');
const db = require('../mysql');
const complainRouter = express.Router();

complainRouter.use(bodyParser.json());
complainRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    console.log('complain request : ' + req.headers);
    db.query('SELECT * FROM complains where C_id = ?', [req.body.id], (err, rows) => {
        if (err)
        {
            return res.end(err);
        }
        else
            res.json(rows);
    });
})
.post((req, res, next) => {
    db.query('SELECT * FROM complains where C_id = ?', [req.body.id], (err, rows) => {
        if (err)
        {
            return res.end(err);
        }
        else
            res.json(rows);
    });
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /complains');
})
.delete((req, res, next) => {
    res.end('can not delete all complains');
});

complainRouter.route('/new')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.post((req, res, next) => {
    console.log(req.body);
    db.query('call addComplain(?, ?)', [req.body.id, req.body.description], (err) => {
        if (err)
        {
            return res.end(err);
        }
        else
            res.end('Complain added!');
    })
})

complainRouter.route('/:complainId')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send details of the complain: ' + req.params.complainId +' to you!');
})
.post((req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /complains/'+ req.params.complainId);
})
.put((req, res, next) => {
  res.write('Updating the complain: ' + req.params.complainId + '\n');
  res.end('Will update the complain: '+ req.body.description);
})
.delete((req, res, next) => {
    db.query('Delete from complains where id = ?', [req.params.complainId], (err) => {
        if (err)
        {
            console.log(err);
            return res.end(err);
        }
        else
            res.end('Deleted complain');
    })
});
module.exports = complainRouter;