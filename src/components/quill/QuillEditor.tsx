'use client'
import React from 'react'
import 'react-quill/dist/quill.snow.css'
import QuillToolbar, { formats, modules } from './QuillToolbar'
import styles from './Quill.module.scss'
import dynamic from 'next/dynamic'

interface QuillEditorProps {
  onChange: (value: string) => void
  contents: string
}

const Quill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
})

const QuillEditor = ({ onChange, contents }: QuillEditorProps) => {
  return (
    <div className={styles.editor}>
      <QuillToolbar />
      <Quill
        theme='snow'
        value={contents}
        onChange={onChange}
        placeholder={`내용을 입력해 주세요 . . .`}
        modules={modules}
        formats={formats}
        style={{ height: '50vh' }}
      />
    </div>
  )
}

export default QuillEditor
