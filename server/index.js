const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
      origin: "*",
  },
});

io.on('connection', (socket) => {
 
    socket.on('message', (data) => {
        const { username, message } = data; // Extraindo os valores do evento recebido
        console.log(`Recebido do cliente: ${username}: ${message}`);
        
        io.emit('receive_message', { username, message });
    });

    socket.on('typing', (data) => {
        const { username, message } = data; // Extraindo os valores do evento recebido
        const lengthTxt = message.length 

        //console.log(`Recebido do cliente: ${username}: ${message}: ${lengthTxt}`);
        
        if (lengthTxt <= 1) {
          io.emit('typing', { username, lengthTxt, message});
        } 
                
    });

})

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log('Server is running...'))
