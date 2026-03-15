"use client";

import { useEffect } from "react";

export default function IframeResizer() {
  useEffect(() => {
    if (window.parent === window) return; // not in iframe

    function sendHeight() {
      const height = document.documentElement.scrollHeight;
      window.parent.postMessage({ type: "resize", height }, "*");
    }

    // Send initial height
    sendHeight();

    // Watch for content changes
    const observer = new ResizeObserver(sendHeight);
    observer.observe(document.body);

    // Also send on step transitions (DOM changes)
    const mutationObserver = new MutationObserver(sendHeight);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
