import { useEffect, useRef, useState } from "react";
import { track, useEditor, useQuickReactor } from "tldraw";

const ZoomToFit = track(() => {
  const editor = useEditor();

  const [showBackToContent, setShowBackToContent] = useState(false);
  const rIsShowing = useRef(false);

  useEffect(() => {
    let timeoutId = null;
    const handleResize = () => {
      if (window.innerWidth > editor.getContainer().clientWidth) {
        if (timeoutId !== null) {
          clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
          editor.zoomToFit({ duration: 5 });
        }, 500);
      }
    };

    window.addEventListener("resize", handleResize, { passive: false });

    return () => {
      window.removeEventListener("resize", handleResize);
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  useQuickReactor(
    "zoom-to-fit",
    () => {
      const showBackToContentPrev = rIsShowing.current;
      const shapeIds = editor.getCurrentPageShapeIds();
      let showBackToContentNow = false;
      if (shapeIds.size) {
        showBackToContentNow = editor.getCulledShapes().size > 0;
      }

      if (showBackToContentPrev !== showBackToContentNow) {
        setShowBackToContent(showBackToContentNow);
        rIsShowing.current = showBackToContentNow;
      }
    },
    [editor]
  );

  if (!showBackToContent) return null;

  if (showBackToContent) return editor.zoomToFit({ duration: 5 });

});

export default ZoomToFit;
