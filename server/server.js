const express = require('express');
const http = require('http');
const path = require('path');
const moment = require('moment');
const socketIO = require('socket.io');

const {Users} = require('./utils/users');
var users = new Users();

const PORT =  8082;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

var isInitNotes = false;

var salon = 'asistencia_evento_coope';

app.use(express.static('./public'));

/*
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});
*/

io.on('connection', (socket) => {


    io.sockets.to(socket.id).emit('ip connected', socket.handshake.address);
    
  
    socket.on('join', (param, callback) => {
       //console.log(param.num_cliente+'   '+ param.nombre +'   '+ param.agencia  );
       //console.log(param);
      
       socket.join(param.sala);
      
       users.removeUser(socket.id);
        
       users.addUser(socket.id,param.num_cliente,param.nombre, param.agencia,param.sala,decodeURI(param.name_evento));
      
       io.to(param.sala).emit('updateUserList', users.getUserList(param.sala));
      
    });
    

    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);
        //console.log(user);
        if(user){ 
            //console.log(`${user.num_cliente} was Disconnected to server in room ${salon}`);
            io.to(user).emit('updateUserList', users.getUserList(salon));
        }
    });
  
    socket.on('atencion', (param, callback) => {
           io.to(param.sala).emit('bloquearexplorer');
    });   
  
    socket.on('mensajedirecto', (param, callback) => {
      // console.log(param.usuario);
      io.to(param.usuario).emit('serviciomensajedirecto', param);
          //io.sockets.to(socket.id)
    }); 
  
    socket.on('mensajesala', (param, callback) => {
       io.to(param.sala).emit('serviciomensajesala', param);
    });     

});



server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

