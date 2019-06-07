var express = require('express');

var resp = require('../Respo/Res');

var router = express.Router();

router.get('/node1', (req, res) => {
    resp.loadAll().then(rows => {
        return res.json({
            node1: rows,
            status: 'success',
            length1: rows.length
        })  
    }).catch(err => {
        console.log(err);
        res.end('View error log on console');
    })
})

router.get('/node2', (req, res) => {
    resp.loadAll2().then(rows => {
        return res.json({
            node2: rows,
            status: 'success',
            length2: rows.length
        })  
    }).catch(err => {
        console.log(err);
        res.statusCode = 500;
        res.end('View error log on console');
    })
})

router.post('/addBlog', (req, res) => {
    console.log('req.body', req.body);
    resp.addBlog(req.body)
        .then(value => {
            res.statusCode = 200;
            res.end('blog added!');
        })
        .catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('View error log on console');
        })
});

router.post('/addBlog_2', (req, res) => {
    console.log('req.body', req.body);
    resp.addBlog_2(req.body)
        .then(value => {
            res.statusCode = 201;
            res.end('blog added!');
        })
        .catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('View error log on console');
        })
});

router.post('/Pump', (req, res) => {
    console.log(req.body);
    resp.addPump(req.body).then(rows => {
            res.statusCode = 200;
            return res.json({
                PumpData: rows,
                length: rows.length,
                status: 'success'
            })
        }).catch(err => {
            console.log(err);
            res.statusCode = 500;
        })
});

router.get('/GetPump', (req, res) => {
    resp.loadPump().then(rows => {
        for (var i = rows.length - 1; i < rows.length; i++){
            value = rows[i];
        }
        return res.json(value).catch(err => {
            console.log(err);
            res.statusCode = 500;
        })
})
})

module.exports = router;