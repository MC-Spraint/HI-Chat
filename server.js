const app = require('express')();                                                       const serverjs = require('http').createServer(app);
const io = require('socket.io')(serverjs);                                              const PORT = process.env.PORT || 3000;
app.set('view engine', 'ejs');

app.get('/' , (req,res)=> {
        res.render('home');                                                             });                                                                                     
io.on("connection", (client) => {


        console.log("User connected: "+client.id);

//server recieves the 'message' event and handles it(step: 2)
        client.on('message',(msg) =>{
                console.log(msg);                                                       
//server broadcasts the event from here,later to be handled by the client(step: 3)
        client.broadcast.emit('message',msg);
        });
                                                                                        });

serverjs.listen(PORT, () => {
        console.log("Success: Server is killin' it.......");                            });
