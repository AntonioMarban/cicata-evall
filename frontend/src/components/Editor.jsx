import { Editor,useEditor, EditorContent } from '@tiptap/react'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Italic from '@tiptap/extension-italic'
import { useEffect } from "react";
import Placeholder from '@tiptap/extension-placeholder'
import "../styles/tiptap.css"
const EditorS = ({ content, onUpdate,placeholderI="Escribe algo" }) => {
  const editor = useEditor({
     extensions: [
    Document,
    Paragraph,
    Text,
    Italic,
    Placeholder.configure({
      placeholder: placeholderI,
      // Opcional: muestra el placeholder solo cuando el documento está vacío
      emptyEditorClass: 'is-editor-empty',
      emptyNodeClass: 'is-empty',
      // Opcional: muestra el placeholder en nodos vacíos
      showOnlyWhenEditable: true,
      showOnlyCurrent: true,
    }),
  ],
    content: content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      onUpdate(html) 
    }
  })
    useEffect(() => {
        if (editor && editor.getHTML() !== content) {
        editor.commands.setContent(content);
        }
    }, [content, editor]);
  return (
    <>
    <div className="flex gap-2 !mt-5 !mb-5">
    <button
    onClick={() => editor.chain().focus().toggleItalic().run()}
    className={`
        p-2 rounded-md transition-colors
        ${editor?.isActive('italic') 
        ? 'cursor-pointer !p-5 bg-[#5CB7E6] text-white' 
        : 'cursor-pointer !p-5 text-gray-600 hover:bg-gray-100'
        }
    `}
    aria-pressed={editor?.isActive('italic')}
    title="Cursiva (Ctrl+I)"
    >
    <i className={`${editor?.isActive('italic') ? 'font-bold' : ''}`}>
        Cursiva
    </i>
    </button>
    </div>
    <div className="w-full h-full p-2.5 rounded-lg border-2 border-[#E1E1E1] transition-colors duration-300 text-lg min-w-[250px]">
      <EditorContent editor={editor} />
    </div>
    </>
  )
}

export default EditorS;