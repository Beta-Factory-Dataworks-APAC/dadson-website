'use client'
   
import React, { useCallback, useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { lowlight } from 'lowlight'

// Define props type
interface TipTapEditorProps {
  value: string
  onChange: (value: string) => void
}

const TipTapEditor: React.FC<TipTapEditorProps> = ({ value, onChange }) => {
  // Initialize editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
      }),
      Underline,
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  // Editor toolbar
  const Toolbar = () => {
    const setLink = useCallback(() => {
      if (!editor) return
      
      const previousUrl = editor.getAttributes('link').href
      const url = window.prompt('URL', previousUrl)
      
      if (url === null) {
        return
      }
      
      if (url === '') {
        editor.chain().focus().extendMarkRange('link').unsetLink().run()
        return
      }
      
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    }, [editor])
    
    return (
      <div className="border-b p-2 flex flex-wrap gap-2">
        <button
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={`p-2 rounded ${editor?.isActive('bold') ? 'bg-blue-100' : ''}`}
        >
          Bold
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={`p-2 rounded ${editor?.isActive('italic') ? 'bg-blue-100' : ''}`}
        >
          Italic
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded ${editor?.isActive('underline') ? 'bg-blue-100' : ''}`}
        >
          Underline
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded ${editor?.isActive('heading', { level: 2 }) ? 'bg-blue-100' : ''}`}
        >
          H2
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-2 rounded ${editor?.isActive('heading', { level: 3 }) ? 'bg-blue-100' : ''}`}
        >
          H3
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded ${editor?.isActive('bulletList') ? 'bg-blue-100' : ''}`}
        >
          Bullet List
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded ${editor?.isActive('orderedList') ? 'bg-blue-100' : ''}`}
        >
          Ordered List
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded ${editor?.isActive('blockquote') ? 'bg-blue-100' : ''}`}
        >
          Quote
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
          className={`p-2 rounded ${editor?.isActive('codeBlock') ? 'bg-blue-100' : ''}`}
        >
          Code Block
        </button>
        <button onClick={setLink} className={`p-2 rounded ${editor?.isActive('link') ? 'bg-blue-100' : ''}`}>
          Link
        </button>
      </div>
    )
  }

  return (
    <div className="border rounded">
      <Toolbar />
      <EditorContent editor={editor} className="p-4" />
    </div>
  )
}

export default TipTapEditor 