const express = require('express');
const bodyParser = require('body-parser');
const db = require('../mysql');
const reservationRouter = express.Router();

reservationRouter.use(bodyParser.json());

reservationRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    console.log('reservation request : ' + req);
    db.query('SELECT * FROM reservations where C_id = ?', [req.body.id], (err, rows) => {
        if (err)
        {
            return res.end(err);
        }
        else
            res.json(rows);
    });
})
.post((req, res, next) => {
    console.log('reservation request : ' + req);
    db.query('SELECT * FROM reservations where C_id = ?', [req.body.id], (err, rows) => {
        if (err)
        {
            return res.end(err);
        }
        else
            res.json(rows);
    });
   /* console.log('reservation request : ' + req);
    */
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /reservation');
})
.delete((req, res, next) => {
    res.end('Deleting all reservations');
});

reservationRouter.route('/new')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.post((req, res, next) => {
    console.log(req.body);
    db.query('call reserve(?, ?, ?, ?)', [req.body.id, req.body.time, req.body.date, req.body.table], (err) => {
        if (err)
        {
            return res.end(err);
        }
        else
            res.end('reservation added!');
    })
})

reservationRouter.route('/:reservationId')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send details of the reservations: ' + req.params.dishId +' to you!');
})
.post((req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /reservation/'+ req.params.dishId);
})
.put((req, res, next) => {
  res.write('Updating the reservation: ' + req.params.dishId + '\n');
  res.end('Will update the reservation: ' + req.body.name + 
        ' with details: ' + req.body.description);
})
.delete((req, res, next) => {
    db.query('Delete from reservations where id = ?', [req.params.reservationId], (err) => {
        if (err)
        {
            return res.end(err);
        }
        else
            res.end('Deleting reservation: ' + req.params.reservationId);
    })
});
module.exports = reservationRouter;