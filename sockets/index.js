module.exports = (server) => {
    const io = require('socket.io')(server, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE']
      }
    });
  
    // Listen for connections
    io.on('connection', (socket) => {
      console.log(`Client connected: ${socket.id}`);
  
      socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
      });
    });
  
    return io;
  };
  