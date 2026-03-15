"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function EmbedBackgroundInner({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const isEmbed = searchParams.get("embed") === "true";

  return (
    <div className={`min-h-screen ${isEmbed ? "bg-transparent" : "bg-[#0f1117]"}`}>
      {children}
    </div>
  );
}

export default function EmbedBackground({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0f1117]">{children}</div>}>
      <EmbedBackgroundInner>{children}</EmbedBackgroundInner>
    </Suspense>
  );
}
