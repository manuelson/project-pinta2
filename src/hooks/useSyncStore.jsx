import { createTLStore, defaultShapeUtils, uniqueId } from "tldraw";
import { useState } from "react";
import { useSocket } from "src/hooks/useSocket";

export function useSyncStore() {

  const socket = useSocket();

  const [store] = useState(() => {
    // Create the store
    const newStore = createTLStore({
      shapeUtils: defaultShapeUtils,
    });
    // Get the snapshot
    // const stringified = localStorage.getItem('my-editor-snapshot')
    //const snapshot = JSON.parse(stringified)

    // Load the snapshot
    //newStore.loadSnapshot(snapshot)
    return newStore;
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

  return store;
}
