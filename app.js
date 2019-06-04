var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    cors = require('cors'),
    session = require('express-session'),
    axios = require('axios')

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');

var RouterCtrl = require('./controllers/Router');
var indexCtrl = require('./controllers/index');
var adminCtrl = require('./controllers/admin');
// var userCtrl = require('./controllers/user');
//var spendCtrl = require('./controllers/index');

//Static folder
app.use('/static', express.static(__dirname + "/views"));
app.use(bodyParser.urlencoded({extended : true}));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

// app.get('/Sign-up', function (req, res) {
//     res.render('Sign-up');
// });

app.get('/', (req, res) => {
    res.json({
        msg: 'hello from nodejs express api'
    });

});

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTION'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 204
}))

// app.use('/user/', userCtrl);
//app.use('/index/', spendCtrl);
app.use('/admin/', adminCtrl);
app.use('/Router', RouterCtrl);
app.use('/index', indexCtrl);

// var port = process.env.PORT || 3000;
// var server = app.listen(port, () => {
//     console.log(`SPA API is running on port ${port}`);
// });
// var io = socketio(server);

io.on('connection', (socket) => {
    console.log('Connected');
    socket.on('disconnect', (dis) => {
        console.log('disconnected');
    })
    socket.on('table 1', (data) => {
        axios.get('http://localhost:3000/Router/node1').then((result) => {
            socket.emit('Receive Data Table 1', result.data.node1);
            //console.log(result.data.node1);
        })
    })
    socket.on('table 2', (data) => {
        axios.get('http://localhost:3000/Router/node2').then((result) => {
            socket.emit('Receive Data Table 2', result.data.node2);
            //console.log(result.data.node2);
        })
    })
    
    socket.on('chart 1', (data) => {
        axios.get('http://localhost:3000/Router/node1').then((result) => {
            socket.emit('Receive Data Chart 1', result.data.node1);
            //console.log(result.data.node2);
        })
    })

    socket.on('chart 2', (data) => {
        axios.get('http://localhost:3000/Router/node2').then((result) => {
            socket.emit('Receive Data Chart 2', result.data.node2);
            //console.log(result.data.node2);
        })
    })
});

http.listen(3000, function(){
    console.log('App listening');
});

module.exports = app;