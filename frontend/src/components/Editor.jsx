import { Editor,useEditor, EditorContent } from '@tiptap/react'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Bold from '@tiptap/extension-bold'
import Text from '@tiptap/extension-text'
import Italic from '@tiptap/extension-italic'
import { useEffect } from "react";
import Placeholder from '@tiptap/extension-placeholder'
import "../styles/tiptap.css"
const EditorS = ({ content, onUpdate,placeholderI="El campo es requerido",setIsEmpty }) => {
  const editor = useEditor({
     extensions: [
    Document,
    Paragraph,
    Text,
    Italic,
    Bold,
    Placeholder.configure({
      placeholder: placeholderI,
      emptyEditorClass: 'is-editor-empty',
      emptyNodeClass: 'is-empty',
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
        setIsEmpty(!editor.state.doc.textContent.trim().length)
        if (editor && editor.getHTML() !== content) {
        editor.commands.setContent(content);
        }
    }, [content, editor]);
  
  useEffect(() => {
        setIsEmpty(!editor.state.doc.textContent.trim().length)
  }, [content]);
  return (
    <>
      <div className="flex !mt-5">
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`
              p-2! transition-colors duration-300 cursor-pointer  text-sm
              ${editor?.isActive('italic') 
              ? 'bg-gray-100 hover:bg-gray-300  font-bold' 
              : 'text-gray-800 hover:bg-gray-300 font-regular'
              }
          `}
          aria-pressed={editor?.isActive('italic')}
          title="Italica (Ctrl+I)"
          >
          <i className={`${editor?.isActive('italic') ? 'font-bold' : ''}`}>
              Italica
          </i>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`
              p-2! transition-colors duration-300 cursor-pointer  text-sm
              ${editor?.isActive('bold') 
              ? 'bg-gray-100 hover:bg-gray-300 font-bold' 
              : 'text-gray-800 hover:bg-gray-300 font-regular'
              }
          `}
          aria-pressed={editor?.isActive('bold')}
          title="Negritas (Ctrl+B)"
          >
          <i className={`${editor?.isActive('bold') ? 'font-bold' : ''}`}>
              Negritas
          </i>
        </button>
      </div>
      <div className="w-full h-full !p-2 border-2 border-[#E1E1E1] transition-colors duration-300 text-lg min-w-[250px]">
        <EditorContent 
          editor={editor} 
        />
      </div>
    </>
  )
}

export default EditorS;