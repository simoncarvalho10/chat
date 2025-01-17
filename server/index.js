const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {cors: {}});
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3002 });

const PORT = 3001

wss.on('connection', (ws) => {

  // Escuta mensagens enviadas pelo cliente
  ws.on('message', (message) => {
    const data = JSON.parse(message);
    const vUsername = data.username
    const vMsg = data.message
    const lengthTxt = vMsg.length 

    const dataRet = {
      username: vUsername,
      count: lengthTxt,
      message: vMsg
    }

    console.log(JSON.stringify(dataRet))
    console.log('lengthTxt: ',lengthTxt)

    if (lengthTxt <= 1) {
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ event: 'typing_message', data: dataRet }));
        }
      });
    }    
    
  });

  ws.on('close', () => {
    console.log('Cliente desconectado.');
  });
});



//Receber a conexão
io.on('connection', socket => {
    console.log("Usuário conectado", socket.id)

    socket.on('disconnect', reason => {
        console.log('Usuário desconectado! ', socket.id)
    })

    // Recebe o username do Client
    socket.on('message', username => {
        console.log('server username: ', username)
        socket.data.username = username
    })
 
    socket.on('message', (data) => {
        const { username, message } = data; // Extraindo os valores do evento recebido
        console.log(`Recebido do cliente: ${username}: ${message}`);
        
        // Emitir para todos os clientes conectados
        io.emit('receive_message', { username, message });
    });
})
server.listen(PORT, () => console.log('Server is running...'))
