// client/src/socket.js
import { io } from 'socket.io-client';

const socket = io('http://localhost:5555'); // Update with your server URL

export default socket;
