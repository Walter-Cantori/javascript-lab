const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost/socket');
require('./tweet');



app.use((req, res, next) => {
  req.io = io;
  return next();
});

io.sockets.on('connection', function(socket){
  socket.on('subscribe', function(room) { 
      console.log('joining room', room);
      socket.join(room); 
  })

  socket.on('unsubscribe', function(room) {  
      console.log('leaving room', room);
      socket.leave(room); 
  })

  socket.on('send', function(data) {
      console.log('sending message', data);
      io.sockets.in(data.room).emit('messageReceived', data);
  });
});

const Tweet = mongoose.model('Tweet');
app.post('/tweet', async (req, res) => {
  const tweet = await Tweet.create(req.body);
  req.io.emit('tweet', tweet);

  return res.json(tweet);
});


app.get('/room/:room', (req, res) => {
  req.io.sockets.in(req.params.room).emit('message', { room: req.params.room});
  return res.status(200).json({ok: 'ok'});
});


server.listen(3001)

// example:
// io.on('connection', socket => {
//   console.log(`Socket conectado: ${socket.id}`);

//   setInterval(() => {
//     socket.emit('message', 'yey');
//   }, 3000)
// })
