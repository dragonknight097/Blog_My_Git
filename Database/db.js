var mysql = require('mysql');

var createConnection = () => {
    return mysql.createConnection({
    	host: 'localhost',
    	port: '3306',
        user: 'root',
        password: '123456',
    	database: 'SPA'
    });
}

exports.load = sql => {
    return new Promise((resolve, reject) => {
        var cn = createConnection();
        cn.connect();
        cn.query(sql, (err, rows, fields) => {
            if (err) {
            	reject(err);
            } else {
            	resolve(rows);
            }

            cn.end();
        });
    });
}

exports.insert = sql => {
    return new Promise((resolve, reject) => {
        var cn = createConnection();
        cn.connect();
        cn.query(sql, (err, value) => {
            if (err) {
                reject(err);
            } else {
                resolve(value);
            }

            cn.end();
        });
    });
}
