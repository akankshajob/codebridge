const express = require('express');
const http = require('http');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const ACTIONS = require('./src/actions/Actions');
const bcrypt = require('bcrypt');
const app = express();
const io = new Server();
const User = require('./User')
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const user = mongoose.create({
      username,
      email,
      password,
    })
    console.log("User Registered")
  });


app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ error: 'User not found' });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ error: 'Incorrect password' });
  
      res.status(200).json({ message: 'Login successful', user: { username: user.username, email: user.email } });
    } catch (err) {
      res.status(500).json({ error: 'Login failed', details: err.message });
    }
  });




// Serve static files from React (for production)
app.use(express.static('build'));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});



// Eval API (JavaScript only)
app.post('/api/execute', (req, res) => {
  const { code } = req.body;
  try {
    const result = eval(code); // ⚠️ use only in local/safe environment
    res.json({ output: String(result) });
  } catch (err) {
    res.json({ output: err.toString() });
  }
});

// Real-time Collaboration
const userSocketMap = {};

function getAllConnectedClients(roomId) {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => ({
      socketId,
      username: userSocketMap[socketId],
    })
  );
}

io.on('connection', (socket) => {
  console.log('🔌 Socket connected:', socket.id);

  socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
    userSocketMap[socket.id] = username;
    socket.join(roomId);
    const clients = getAllConnectedClients(roomId);
    clients.forEach(({ socketId }) => {
      io.to(socketId).emit(ACTIONS.JOINED, {
        clients,
        username,
        socketId: socket.id,
      });
    });
  });

  socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
    socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { code });
  });

  socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
    io.to(socketId).emit(ACTIONS.CODE_CHANGE, { code });
  });

  socket.on('disconnecting', () => {
    const rooms = [...socket.rooms];
    rooms.forEach((roomId) => {
      socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
        socketId: socket.id,
        username: userSocketMap[socket.id],
      });
    });
    delete userSocketMap[socket.id];
  });
});

// Start server ONCE
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
