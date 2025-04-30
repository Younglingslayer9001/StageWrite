const socket = io();  // Connect to the server

// Get the user's name
const username = prompt("Enter your name: ");
socket.emit('newUser', username);

// Update user list
socket.on('userList', (users) => {
  const userList = document.getElementById('userList');
  userList.innerHTML = '';
  users.forEach(user => {
    const li = document.createElement('li');
    li.textContent = user;
    userList.appendChild(li);
  });
});

// Get the script content editor
const scriptEditor = document.getElementById('scriptEditor');

// When the user edits the script, broadcast the content
scriptEditor.addEventListener('input', () => {
  socket.emit('editScript', scriptEditor.value);
});

// Update the script content in all users' editors
socket.on('updateScript', (content) => {
  scriptEditor.value = content;
});
