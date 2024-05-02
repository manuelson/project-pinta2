import { useState } from "react";
import { useEffect } from "react";
import { Tldraw, track, useEditor, useTools } from "tldraw";
import "tldraw/tldraw.css";
import { useSyncStore } from "./useSyncStore";
import "./custom-ui.css";

function App() {

  const {store, socket} = useSyncStore();

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
    Toolbar: null,
  };

  return (
    <div style={{ position: "fixed", inset: 1 }}>
      <Tldraw store={store} components={components} autoFocus={false}>
        <Arrow/>
        <CustomUi />
      </Tldraw>
    </div>
  );
}

const Arrow = track(() => {
  const editor = useEditor();
  console.log(editor)
  return (
    <div className="custom-layout">
      <div className="custom-toolbar"></div>
    </div>
  );
});

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
