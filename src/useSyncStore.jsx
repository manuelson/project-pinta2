import { createTLStore, defaultShapeUtils, uniqueId } from "tldraw";
import { useState } from "react";

export function useSyncStore() {
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

  return store;
}
