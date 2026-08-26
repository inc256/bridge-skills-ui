import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

export function PdfViewer({ fileUrl }: { fileUrl: string }) {
  const layoutPlugin = defaultLayoutPlugin();

  return (
    <div className="h-[min(75vh,750px)] w-full overflow-hidden bg-slate-100">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        <Viewer fileUrl={fileUrl} plugins={[layoutPlugin]} />
      </Worker>
    </div>
  );
}
