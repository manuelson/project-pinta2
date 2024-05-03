import { Tldraw } from "tldraw";
import { useSyncStore } from "src/hooks/useSyncStore";
import CustomUi from "src/components/Board/CustomUi";
import ZoomToFit from "src/components/Board/ZoomToFit";
import "tldraw/tldraw.css";

export function Board() {

  const store = useSyncStore();

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
    HelperButtons: null,
    DebugPanel: null,
    DebugMenu: null,
    SharePanel: null,
    MenuPanel: null,
    TopPanel: null,
    //Toolbar: null,
  };


  return (
    <div style={{ position: "fixed", inset: 1 }}>
      <Tldraw store={store} components={components} autoFocus={false} forceMobile={true}>
        <ZoomToFit />
      </Tldraw>
    </div>
  );
}
