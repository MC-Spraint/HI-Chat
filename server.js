const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home');
});

// Handle socket.io connections
io.on('connection', (client) => {
        
    console.log(`User connected: ${client.id}`);
    
    // Server receives the 'message' event from the client (Step 2)
    client.on('message', (msg) => {
        console.log(`Message received: ${msg}`);
        
        // Broadcast the message to other clients (Step 3)
        client.broadcast.emit('message', msg);
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Success: Server is running on port ${PORT}`);
});
