var db = require('../Database/db');

exports.addBlog = Entity => {
    var sql = `insert into node_1 (nhietdo, doamkhongkhi, doamdat) values('${Entity.nhietdo}', '${Entity.doamkhongkhi}', '${Entity.doamdat}')`;
    return db.insert(sql);
};

exports.addBlog_2 = Entity => {
    var sql = `insert into node_2 (nhietdo, doam, ph, oxyhoatan) values('${Entity.nhietdo}', '${Entity.doam}', '${Entity.ph}', '${Entity.oxyhoatan}')`;
    return db.insert(sql);
};

exports.loadAll = () => {
    var sql = `select * from node_1`;
    return db.insert(sql);
};

exports.loadAll2 = () => {
    var sql= `select * from node_2`;
    return db.insert(sql);
};

exports.addUsers = Entity => {
    console.log("abx");
    var sql = `insert into users (email, password, first_name, last_name) 
    values('${Entity.email}', '${Entity.password}', '${Entity.first_name}', '${Entity.last_name}')`;
    return db.insert(sql);
};

exports.loadUsers = () => {
    var sql= `select * from users`;
    return db.insert(sql);
};

exports.loadByEmail = Entity => {
    var sql = `select * from users where email = '${Entity}'`;
    return db.insert(sql);
};

exports.addPump = Entity => {
    var sql = `insert into pump (Auto, node, Timer, Pump1, Pump2, Pump3)
    values('${Entity.Auto}', '${Entity.node}', '${Entity.Timer}', '${Entity.Pump1}', '${Entity.Pump2}', '${Entity.Pump3}')`
    return db.insert(sql);
}

exports.loadPump = Entity => {
    var sql = `select * from pump`;
    return db.insert(sql);
};

exports.addthreshold = Entity => {
    var sql = `insert into threshold_t (nhietdo_t, doam_t, doamkhongkhi_t, doamdat_t, ph_t, oxyhoatan_t)
    values('${Entity.nhietdo_t}', '${Entity.doam_t}', '${Entity.doamkhongkhi_t}', '${Entity.doamdat_t}', '${Entity.ph_t}', '${Entity.oxyhoatan_t}')`
    return db.insert(sql);
}

exports.loadthreshold = Entity => {
    var sql = `select * from threshold_t`;
    return db.insert(sql);
};
// exports.loadByPassword = Entity => {
//     var sql = `select * from users where password = '${Entity.password}'`;
//     return db.insert(sql);
// };


