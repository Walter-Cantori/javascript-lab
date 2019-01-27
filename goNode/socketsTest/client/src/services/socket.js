import connect from 'socket.io-client';

const socket = connect('http://localhost:3001');

export default socket;