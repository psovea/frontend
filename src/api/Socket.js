import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:3500');

var subscribeToMessage = (callBack) => {
  socket.on('message', timestamp => callBack(null, timestamp));
  socket.emit('subscribeToMessage', 1000);
}

export { subscribeToMessage };
