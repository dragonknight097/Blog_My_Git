var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    cors = require('cors'),
    session = require('express-session'),
    axios = require('axios')

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('trust proxy', 1)
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


app.use('/static', express.static(__dirname + "/views"));
app.use(bodyParser.urlencoded({extended : true}));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

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

app.use('/admin/', adminCtrl);
app.use('/Router', RouterCtrl);
app.use('/index', indexCtrl);

io.on('connection', (socket) => {
    console.log('Connected');
    socket.on('disconnect', (dis) => {
        console.log('disconnected');
    }),
    socket.on('join', function(room) {
        socket.join(room);
    });
    socket.on('table 1', (data) => {
        axios.get('http://localhost:3000/Router/node1').then((result) => {
            socket.emit('Receive Data Table 1', result.data.node1);
        })
    })
    socket.on('table 2', (data) => {
        axios.get('http://localhost:3000/Router/node2').then((result) => {
            socket.emit('Receive Data Table 2', result.data.node2);
        })
    })
    
    socket.on('chart 1', (data) => {
        axios.get('http://localhost:3000/Router/node1').then((result) => {
            socket.emit('Receive Data Chart 1', result.data.node1);
        })
    })

    socket.on('chart 2', (data) => {
        axios.get('http://localhost:3000/Router/node2').then((result) => {
            socket.emit('Receive Data Chart 2', result.data.node2);
        })
    })

    socket.on('home 1', (data) => {
        console.log('connected home 1');
        axios.get('http://localhost:3000/Router/node1').then((result) => {
            socket.emit('Data Home 1', result.data.node1);
        })
    })

    socket.on('home 2', (data) => {
        console.log('connected home 2');
        axios.get('http://localhost:3000/Router/node2').then((result) => {
            socket.emit('Data Home 2', result.data.node2);
        })
    })
});

http.listen(3000, function(){
    console.log('App listening');
});

module.exports = app;