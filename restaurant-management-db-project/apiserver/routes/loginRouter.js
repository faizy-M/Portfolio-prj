const express = require('express');
const bodyParser = require('body-parser');
const db = require('../mysql');
const loginRouter = express.Router();

loginRouter.use(bodyParser.json());

loginRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.post((req,res,next) => {
    console.log("yeaaaaahhhhhh",req.body);
    db.execute('call Authcust(?, ?)', [req.body.email, req.body.password], (err, rows) => {
        if (err) {
          console.log(err);
          var err = new Error('You are not authenticated!');
          err.status = 401;
          res.end(err);
        }
        else if(rows[0][0] == null)
        {
          var err = new Error('You are not authenticated!');
          err.status = 401;
          res.end(err);
        }
        else {
          res.json(rows);
        }
    });
})
loginRouter.route('/new').all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.post((req, res, next) => {
    db.query('call signup(?, ?, ?)', [req.body.username, req.body.name, req.body.password], (err, rows) => {
        if (err)
        {
            console.log(err);
            var err = new Error('You are not authenticated!');
            err.status = 401;
            res.end(err);
        }
        else if(rows[0] == null)
        {
            var err = new Error('Username already exists');
            err.statusCode = 403;
            res.end(err);
        }
        else
        {
            res.json(rows);
        }
    });
})
loginRouter.route('/staff')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    db.execute('call Authstaff(?, ?)', [req.body.username, req.body.password], (err, rows) => {
        if (err) {
          console.log(err);
          var err = new Error('You are not authenticated!');
          err.status = 401;
          res.end(err);
        }
        else if(rows[0][0] == null)
        {
          var err = new Error('You are not authenticated!');
          err.status = 401;
          res.end(err);
        }
        else {
          res.json(rows);
        }
    });
})
.post((req, res, next) => {
    db.query('call signupstaff(?, ?, ?, ?, ?)', [req.body.username, req.body.name, req.body.password, req.body.designation, req.body.startdate], (err, rows) => {
        if (err)
        {
            console.log(err);
            var err = new Error('You are not authenticated!');
            err.status = 401;
            res.end(err);
        }
        else if(rows[0] == null)
        {
            var err = new Error('Username already exists');
            err.statusCode = 403;
            res.end(err);
        }
        else
        {
            res.json(rows);
        }
    });
})
module.exports = loginRouter;