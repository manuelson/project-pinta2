import { useState } from "react";
import { useSocket } from "src/hooks/useSocket";

export function InputText({setMessage}) {

  const socket = useSocket();

  const handleSendMessage = () => {
    socket.emit("chat_message", {
      message: message,
      user: "user",
      timestamp: new Date().toISOString(),
      id: socket.id,
    });
    setMessage("");
  }

  return (
    <div>
      <textarea type="text" onChange={(e) => {
        setMessage(e.target.value);
      }}/>
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}
