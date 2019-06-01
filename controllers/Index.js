var express = require('express');

var resp = require('../Respo/Res');

var router = express.Router();

router.get('/chart', function (req, res) {
    var table1 = resp.loadAll();

    var table2 = resp.loadAll2();

    Promise.all([table1, table2]).then(function([rows1, rows2]){
        console.log('table1: ',rows1);
        console.log('table2: ',rows2);
        res.render('chart', {foo_table: rows1, bar_table: rows2});
    })
})

router.get('/Dashboard', function (req, res) {
    var table1 = resp.loadAll();

    var table2 = resp.loadAll2();

    Promise.all([table1, table2]).then(function([rows1, rows2]){
        console.log('table1: ',rows1);
        console.log('table2: ',rows2);
        res.render('Dashboard', {foo_table: rows1, bar_table: rows2});
    })
});

router.get('/Icons', function (req, res) {
    res.render('icons');
});

router.get('/Tables', function(req, res, next) {
    var table1 = resp.loadAll();

    var table2 = resp.loadAll2();

    Promise.all([table1, table2]).then(function([rows1, rows2]){
        console.log('table1: ',rows1);
        console.log('table2: ',rows2);
        res.render('Tables', {foo_table: rows1, bar_table: rows2});
    })
});

router.get('/About', function (req, res) {
    res.render('about');
})

router.get('/Graph1', function (req, res) {
    var table = resp.loadAll().then(function (rows) {
        console.log('table:', rows);
        res.render('GraphNode1', {Table: rows});
    })
})

router.get('/Graph2', function (req, res) {
    var table = resp.loadAll2().then(function (rows) {
        console.log('table:', rows);
        res.render('GraphNode2', {Table: rows});
    })
})

router.get('/TableNode1', function (req, res) {
    var table = resp.loadAll().then(function (rows) {
        console.log('table:', rows);
        res.render('Table_Node1', {Table: rows});
    })
})

router.get('/TableNode2', function (req, res) {
    var table = resp.loadAll2().then(function (rows) {
        console.log('table:', rows);
        res.render('Table_Node2', {Table: rows});
    })
})

module.exports = router;