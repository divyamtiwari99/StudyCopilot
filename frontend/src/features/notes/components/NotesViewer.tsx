import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import type {
  NotesArtifact,
} from "../services/notes.service";


interface NotesViewerProps {
  notes: NotesArtifact;
}


export default function NotesViewer({
  notes,
}: NotesViewerProps) {


  return (

    <div
      className="
        prose
        prose-invert
        max-w-none
        rounded-2xl
        border
        border-white/10
        bg-white/[0.04]
        p-8
      "
      style={{

        "--tw-prose-headings":
          "white",

        "--tw-prose-bold":
          "white",

      } as React.CSSProperties}
    >


      <ReactMarkdown
        remarkPlugins={[
          remarkGfm,
        ]}
      >
        {notes.markdown}
      </ReactMarkdown>


    </div>

  );

}