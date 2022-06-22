const express = require('express');
const bodyParser = require('body-parser');
const db = require('../mysql');
const reviewRouter = express.Router();

reviewRouter.use(bodyParser.json());

reviewRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    db.query('SELECT * FROM reviews where rating >= 4', (err,rows) => {
        if(err) {
            res.statusCode = 500;
            res.end('Error: ' + err);
        } else {
            console.log('rows : ' + rows);
            res.json(rows);
        }
    });
    /*
        db.query('SELECT * FROM reviews where C_id = ?', [req.id], (err, rows) => {
            if (err)
            {
                return res.end(err);
            }
            else
                res.json(rows);
        });*/
})
.post((req, res, next) => {
    console.log(req.body);
    db.query('call postreview(?, ?, ?)', [req.body.id, req.body.rating, req.body.description], (err) => {
        if (err)
        {
            return res.end(err);
        }
        else
            res.end('review added!');
    })
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /reviews');
})
.delete((req, res, next) => {
    res.end('You can not delete all reviews');
});

reviewRouter.route('/:reviewId')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send details of the review: ' + req.params.reviewId +' to you!');
})
.post((req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /reservation/'+ req.params.reviewId);
})
.put((req, res, next) => {
  res.write('Updating the reservation: ' + req.params.dishId + '\n');
  res.end('Will update the reservation: ' + req.body.name + 
        ' with details: ' + req.body.description);
})
.delete((req, res, next) => {
    db.query('Delete from reservations where id = ?', [req.params.reviewId], (err) => {
        if (err)
        {
            return res.end(err);
        }
        else
            res.end('Deleted review: ' + req.params.reviewId);
    })
});
module.exports = reviewRouter;