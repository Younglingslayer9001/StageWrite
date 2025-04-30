const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public')); // Serve static files (frontend)

let users = [];

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Broadcast to all users when a new user joins
  socket.on('newUser', (username) => {
    users.push(username);
    io.emit('userList', users); // Send updated user list to all
  });

  // Listen for script edits and broadcast them
  socket.on('editScript', (content) => {
    io.emit('updateScript', content); // Send updated script content to all
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
    // Remove user from the list and notify others
    users = users.filter(user => user !== socket.id);
    io.emit('userList', users);
  });
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});