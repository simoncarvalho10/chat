const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);

const wss = new WebSocket.Server({ server }); 

wss.on('connection', (ws) => {

  ws.on('message', (message) => {
    //console.log("Wesocket Conectado")
    const data = JSON.parse(message);
    const vUsername = data.username
    const vMsg = data.message
    const lengthTxt = vMsg.length 

    const dataRet = {
      username: vUsername,
      count: lengthTxt,
      message: vMsg
    }

    if (lengthTxt <= 1) {
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ event: 'typing_message', data: dataRet }));
          console.log("Wesocket Enviado")
        }
      });
    }    
    
  });

  ws.on('close', () => {
    console.log('Cliente desconectado.');
  });
});

const io = new Server(server, {
  cors: {
      origin: "*", // Permitir conexões de qualquer origem
      //transports: ["websocket"],
  },
});

io.on('connection', (socket) => {

    socket.on('disconnect', reason => {
        console.log('Usuário desconectado! ', socket.id)
    })
 
    socket.on('message', (data) => {
        const { username, message } = data; // Extraindo os valores do evento recebido
        console.log(`Recebido do cliente: ${username}: ${message}`);
        
        // Emitir para todos os clientes conectados
        io.emit('receive_message', { username, message });
    });
})

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log('Server is running...'))
