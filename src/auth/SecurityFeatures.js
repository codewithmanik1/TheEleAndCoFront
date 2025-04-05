import { useEffect } from "react";

const SecurityFeatures = () => {
  useEffect(() => {
    // Disable Right-Click
    const disableRightClick = (event) => event.preventDefault();
    document.addEventListener("contextmenu", disableRightClick);

    // Disable DevTools Shortcuts
    const disableDevTools = (event) => {
      if (
        (event.ctrlKey &&
          event.shiftKey &&
          (event.key === "I" || event.key === "J" || event.key === "C")) ||
        (event.ctrlKey && (event.key === "U" || event.key === "P")) ||
        event.key === "F12" ||
        (event.ctrlKey && event.key === "p") ||
        (event.ctrlKey && event.key === "s")
      ) {
        event.preventDefault();
      }
    };
    document.addEventListener("keydown", disableDevTools);

    // **BLOCK COPY, CUT, PASTE, TEXT SELECTION**
    const disableCopyCutPaste = (event) => {
      event.preventDefault();
    };
    document.addEventListener("copy", disableCopyCutPaste);
    document.addEventListener("cut", disableCopyCutPaste);
    document.addEventListener("paste", disableCopyCutPaste);

    // Disable Text Selection
    const disableTextSelection = (event) => event.preventDefault();
    document.addEventListener("selectstart", disableTextSelection);

    // **STRONGER DEVTOOLS DETECTION & FREEZING**
    let devToolsOpen = false;

    const checkDevTools = () => {
      // Use the 'debugger' trick
      const start = performance.now();
      debugger;
      const end = performance.now();
      if (end - start > 100) {
        devToolsOpen = true;
      }

      if (devToolsOpen) {
        // Completely disable interactions
        document.body.style.pointerEvents = "none";
        document.body.style.overflow = "hidden";
        document.body.style.userSelect = "none";
        document.body.classList.add("blackout");

        // Block all input events
        window.addEventListener("keydown", (e) => e.preventDefault(), true);
        window.addEventListener("keyup", (e) => e.preventDefault(), true);
        window.addEventListener("mousedown", (e) => e.preventDefault(), true);
        window.addEventListener("mouseup", (e) => e.preventDefault(), true);
        window.addEventListener("mousemove", (e) => e.preventDefault(), true);
        window.addEventListener("touchstart", (e) => e.preventDefault(), true);
        window.addEventListener("touchmove", (e) => e.preventDefault(), true);
        window.addEventListener("wheel", (e) => e.preventDefault(), true);
        window.addEventListener("scroll", (e) => e.preventDefault(), true);

        // Infinite loop to freeze the page
        while (true) {}
      }
    };

    // Check every second
    const devToolsChecker = setInterval(checkDevTools, 1000);

    // Cleanup
    return () => {
      clearInterval(devToolsChecker);
      document.removeEventListener("contextmenu", disableRightClick);
      document.removeEventListener("keydown", disableDevTools);
      document.removeEventListener("copy", disableCopyCutPaste);
      document.removeEventListener("cut", disableCopyCutPaste);
      document.removeEventListener("paste", disableCopyCutPaste);
      document.removeEventListener("selectstart", disableTextSelection);
    };
  }, []);

  return null;
};

export default SecurityFeatures;
