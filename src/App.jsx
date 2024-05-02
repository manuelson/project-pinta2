import { useState } from "react";
import { useEffect } from "react";
import { Tldraw, track, useEditor, useTools } from "tldraw";
import socketIO from "socket.io-client";
import "tldraw/tldraw.css";
import { useSyncStore } from "./useSyncStore";
import "./custom-ui.css";

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
          changes: { added, updated, removed },
        } = update;

        for (const record of Object.values(added)) {
          store.put([record]);
        }
        for (const [, to] of Object.values(updated)) {
          store.put([to]);
        }
        for (const record of Object.values(removed)) {
          store.remove([record.id]);
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

  const components = {
    ContextMenu: null,
    ActionsMenu: null,
    HelpMenu: null,
    ZoomMenu: null,
    MainMenu: null,
    Minimap: null,
    //StylePanel: null,
    PageMenu: null,
    NavigationPanel: null,
    KeyboardShortcutsDialog: null,
    QuickActions: null,
    //HelperButtons: null,
    DebugPanel: null,
    DebugMenu: null,
    SharePanel: null,
    MenuPanel: null,
    TopPanel: null,
    Toolbar: null
  };

  return (
    <div style={{ position: "fixed", inset: 1 }}>
      <Tldraw store={store} components={components} autoFocus={false}>
        <CustomUi />
      </Tldraw>
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

const CustomUi = track(() => {
  const editor = useEditor();

  useEffect(() => {
    const handleKeyUp = (e) => {
      switch (e.key) {
        case "Delete":
        case "Backspace": {
          editor.deleteShapes(editor.getSelectedShapeIds());
          break;
        }
        case "v": {
          editor.setCurrentTool("select");
          break;
        }
        case "e": {
          editor.setCurrentTool("eraser");
          break;
        }
        case "x":
        case "p":
        case "b":
        case "d": {
          editor.setCurrentTool("draw");
          break;
        }
      }
    };

    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  });

  return (
    <div className="custom-layout">
      <div className="custom-toolbar">
        <button
          className="custom-button"
          data-isactive={editor.getCurrentToolId() === "select"}
          onClick={() => editor.setCurrentTool("select")}
        >
          Select
        </button>
        <button
          className="custom-button"
          data-isactive={editor.getCurrentToolId() === "draw"}
          onClick={() => editor.setCurrentTool("draw")}
        >
          Pencil
        </button>
        <button
          className="custom-button"
          data-isactive={editor.getCurrentToolId() === "eraser"}
          onClick={() => editor.setCurrentTool("eraser")}
        >
          Eraser
        </button>
      </div>
    </div>
  );
});

export default App;
