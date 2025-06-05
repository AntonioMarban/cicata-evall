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
      <div className="flex gap-2 !mt-5 !mb-3">
        <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`
            p-2! rounded-md transition-colors duration-300 border-2 cursor-pointer  text-sm
            ${editor?.isActive('italic') 
            ? 'bg-gray-100 hover:bg-gray-300 border-[#888888] font-bold' 
            : 'text-gray-800 hover:bg-gray-300 border-[#E1E1E1] font-regular'
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
      <div className="w-full h-full rounded-lg border-2 border-[#E1E1E1] transition-colors duration-300 text-lg min-w-[250px]">
        <EditorContent 
          editor={editor} 
        />
      </div>
    </>
  )
}

export default EditorS;