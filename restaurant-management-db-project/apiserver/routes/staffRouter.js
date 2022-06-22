const express = require('express');
const bodyParser = require('body-parser');
const db = require('../mysql');
const staffRouter = express.Router();

staffRouter.use(bodyParser.json());

staffRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    db.query('SELECT * FROM staff', (err, rows) => {
        if (err)
        {
            return res.end(err);
        }
        else
            res.json(rows);
    });
})
.post((req, res, next) => {
    res.end('Will add the staff: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /staff');
})
.delete((req, res, next) => {
    res.end('Deleting all staff');
});

staffRouter.route('/:staffId')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send details of the staff member: ' + req.params.dishId +' to you!');
})
.post((req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /staff/'+ req.params.dishId);
})
.put((req, res, next) => {
  res.write('Updating the staff: ' + req.params.dishId + '\n');
  res.end('Will update the staff: ' + req.body.name + 
        ' with details: ' + req.body.description);
})
.delete((req, res, next) => {
    res.end('Deleting staff member: ' + req.params.dishId);
});
module.exports = staffRouter;