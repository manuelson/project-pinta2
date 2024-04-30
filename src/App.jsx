import { useRef, useState } from "react";
import { useEffect } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import socketIO from "socket.io-client";

// add token ando connect to socketio
const socket = socketIO(import.meta.env.VITE_SOCKET_IO_URL, {
  auth: {
    token: "valid",
  },
});

function App() {
  const [messages, setMessages] = useState([]);

  const canvasRef = useRef(null);

  socket.on("pathsResponse", (data) =>{

    if (canvasRef.current) {
    canvasRef.current.loadPaths(data);
  }
  });


  useEffect(() => {
    socket.on("messageResponse", (data) => setMessages([...messages, data]));

  }, [socket, messages]);

  const handleSendMessage = () => {
    socket.emit("message", {
      text: "test",
      name: "manu",
      id: `${socket.id}`,
    });
  };

  const handleSavePaths = async (e) => {
    if (e.paths.length > 1) {
      const paths = await canvasRef.current.exportPaths();
      console.log(paths);
    }
  }

  const handleEmitPaths = (e) => {
    console.log(e);
    socket.emit("paths", {
      paths: e,
      id: `${socket.id}`
    });
  }

  const styles = {
    border: '0.0625rem solid #9c9c9c',
    borderRadius: '0.25rem',
  };

  return (
    <div>
      <button onClick={handleSendMessage}>HOli</button>
      {messages.map((message, index) => (
        <div key={index}>
          {message.name} - {message.text}
        </div>
      ))}

      <ReactSketchCanvas
        ref={canvasRef}
        onStroke={handleSavePaths}
        onChange={handleEmitPaths}
        style={styles}
        width="600"
        height="400"
        strokeWidth={4}
        strokeColor="red"
      />
    </div>
  );
}

export default App;
