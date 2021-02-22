var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
} else {
    app.use(express.static(path.join(__dirname, 'public')));
}



app.use(cors({
 origin: '*',
 methods: ['GET', 'PUT', 'DELETE', 'PATCH', 'POST'],
 allowedHeaders: 'Content-Type, Authorization, Origin, X-Requested-With, Accept'
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRoutes);
app.use('/chat', chatRoutes);



module.exports = app;
