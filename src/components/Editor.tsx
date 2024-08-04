import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CodeBlock from "@ckeditor/ckeditor5-code-block/src/codeblock";

interface EditorProps {
  initialValue: string; // Asumsi data editor berupa string
  onChange: (data: string) => void; // Callback untuk perubahan data editor
}

const Editor: React.FC<EditorProps> = ({ initialValue, onChange }) => {
  // Handle changes to the editor content
  const handleChange = (_: any, editor: any) => {
    const data = editor.getData();
    onChange(data);
  };

  return (
    <CKEditor
      editor={ClassicEditor}
      data={initialValue ?? "..."}
      onChange={handleChange} // Use handleChange to process data
      config={{
        toolbar: {
          items: [
            "heading",
            "|",
            "bold",
            "italic",
            "link",
            "|",
            "bulletedList",
            "numberedList",
            "|",
            "blockQuote",
            "insertTable",
            "mediaEmbed",
            "|",
            "undo",
            "redo",
          ],
          shouldNotGroupWhenFull: true,
        },
        language: "en",
        // plugins: [CodeBlock], // Include CodeBlock plugin
      }}
    />
  );
};

export default Editor;
