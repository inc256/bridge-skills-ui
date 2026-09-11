import { useEffect, useRef, useState } from "react";
import { init } from "pptx-preview";

type PptViewerProps = {
  fileUrl: string;
};

export function PptViewer({ fileUrl }: PptViewerProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    const container = containerRef.current;
    if (!viewport || !container) return;

    let cancelled = false;
    let file: ArrayBuffer | null = null;
    let previewer: ReturnType<typeof init> | null = null;
    setError(null);

    const renderPresentation = async () => {
      if (!file || cancelled) return;
      const viewportWidth = viewport.clientWidth;
      const viewportHeight = viewport.clientHeight;
      if (viewportWidth <= 0 || viewportHeight <= 0) return;

      previewer?.destroy();
      container.replaceChildren();

      try {
        previewer = init(container, {
          mode: "slide",
          width: viewportWidth,
          height: viewportHeight,
        });
        await previewer.load(file);
        const slideRatio = previewer.pptx.width / previewer.pptx.height;
        const slideWidth = Math.floor(Math.min(viewportWidth, viewportHeight * slideRatio));
        const slideHeight = Math.floor(slideWidth / slideRatio);
        if (slideWidth <= 0 || slideHeight <= 0) return;
        previewer.options.width = slideWidth;
        previewer.options.height = slideHeight;
        container.style.width = `${slideWidth}px`;
        container.style.height = `${slideHeight}px`;
        await previewer.preview(file);
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError instanceof Error ? loadError.message : "Unable to preview this presentation.");
        }
      }
    };

    const resizeObserver = new ResizeObserver(() => void renderPresentation());
    resizeObserver.observe(viewport);

    void fetch(fileUrl)
      .then((response) => {
        if (!response.ok) throw new Error(`Unable to load presentation (${response.status}).`);
        return response.arrayBuffer();
      })
      .then((buffer) => {
        if (cancelled) return;
        file = buffer;
        return renderPresentation();
      })
      .catch((loadError) => {
        if (!cancelled) {
          setError(loadError instanceof Error ? loadError.message : "Unable to preview this presentation.");
        }
      });

    return () => {
      cancelled = true;
      resizeObserver.disconnect();
      previewer?.destroy();
      container.style.width = "";
      container.style.height = "";
      container.replaceChildren();
    };
  }, [fileUrl]);

  return (
    <div ref={viewportRef} className="relative flex h-full min-h-0 min-w-0 items-center justify-center overflow-hidden bg-slate-100">
      <div ref={containerRef} className="ppt-preview shrink-0" />
      {error && (
        <div className="absolute inset-0 grid place-items-center bg-slate-100 p-6 text-center text-sm text-slate-600">
          {error}
        </div>
      )}
    </div>
  );
}
