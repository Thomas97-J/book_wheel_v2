"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { Toolbar } from "./toolbar";
import { cn } from "@/shared/lib/utils";

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
  editable?: boolean;
  className?: string;
}

export function TiptapEditor({
  content,
  onChange,
  editable = true,
  className,
}: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
      Image,
    ],
    immediatelyRender: false,
    content,
    editable,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: cn(
          "prose prose-sm sm:prose-base dark:prose-invert focus:outline-none min-h-[300px] p-4 bg-background rounded-b-md border-x border-b border-border shadow-sm",
          !editable && "border-none shadow-none bg-transparent p-0 min-h-0",
          className,
        ),
      },
    },
  });

  return (
    <div className="w-full flex flex-col rounded-md overflow-hidden border border-border bg-background shadow-sm">
      {editable && <Toolbar editor={editor} />}
      <EditorContent editor={editor} className="flex-1" />
    </div>
  );
}
