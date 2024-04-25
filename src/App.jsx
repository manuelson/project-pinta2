import { useState } from "react";
import { useEffect } from "react";
import socketIO from "socket.io-client";
const socket = socketIO.connect(import.meta.env.VITE_SOCKET_IO_URL);

function App() {

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('messageResponse', (data) => setMessages([...messages, data]));
  }, [socket, messages]);


  const handleSendMessage = () => {
    socket.emit('message', {
      text: 'test',
      name: 'manu',
      id: `${socket.id}`
    });
  };

  return (
    <div>
      <button onClick={handleSendMessage}>HOli</button>
      {messages.map((message, index) => (
        <div key={index}>{message.name} - {message.text}</div>
      ))}

    </div>
  );
}

export default App;
