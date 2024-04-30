import { useState } from "react";
import { useEffect } from "react";
import {
  Tldraw
} from "tldraw";
import socketIO from "socket.io-client";
import "tldraw/tldraw.css";
import { useSyncStore } from "./useSyncStore";

const socket = socketIO(import.meta.env.VITE_SOCKET_IO_URL, {
  auth: {
    token: "valid",
  },
});

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("messageResponse", (data) => setMessages([...messages, data]));
  }, [socket, messages]);

  const store = useSyncStore();

  socket.on("canvasResponse", (message) => {

    if (message.clientId === socket.id) return;

    const data = JSON.parse(message.data);
    for (const update of data) {
      store.mergeRemoteChanges(() => {
        const {
          changes: { updated },
        } = update;
        if (!updated) return;
        for (const [, to] of Object.values(updated)) {
          store.put([to]);
        }
      });
    }
  });

  store.listen(
    (update) => {
      socket.emit("canvas", {
        clientId: socket.id,
        data: JSON.stringify([update]),
      });
    },
    { scope: "document", source: "user" }
  );

  return (
    <div style={{ position: "fixed", inset: 0 }}>
      <Tldraw store={store} />
      <button
        onClick={() => {
          const snapshot = store.getSnapshot();
          const stringified = JSON.stringify(snapshot);
          localStorage.setItem("my-editor-snapshot", stringified);
        }}
      >
        Save
      </button>
    </div>
  );
}

export default App;
