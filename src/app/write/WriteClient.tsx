'use client'
import Button from '@/components/button/Button'
import QuillEditor from '@/components/quill/QuillEditor'
import React, { useState } from 'react'
import styles from './WriteClient.module.scss'
import { Timestamp, addDoc, collection } from 'firebase/firestore'
import { db } from '@/firebase/firebase'

type DataType = {
  title: string
  description: string
  contents: string
  keywords: string
  userId?: string
  userName?: string
  createdAt?: Date
}

const initialData = {
  title: '',
  description: '',
  contents: '',
  keywords: '',
  userId: '',
  userName: '',
}

const WriteClient = () => {
  const [data, setData] = useState<DataType>(initialData)

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget
    setData((prev) => ({ ...prev, [name]: value } as DataType))
  }

  const handleEditorChange = (value: string) => {
    setData((prev) => ({ ...prev, contents: value } as DataType))
  }

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    const dataObj = {
      ...data,
      createdAt: Timestamp.now().toDate(),
    }
    await addDoc(collection(db, 'posts'), dataObj)
  }

  return (
    <div className={styles.page}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className={styles.title}>
          <input
            name='title'
            type='text'
            placeholder='제목'
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className={styles.summary}>
          <input
            name='description'
            type='type'
            placeholder='요약'
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className={styles.keywords}>
          <input
            name='keywords'
            type='type'
            placeholder='키워드'
            onChange={(e) => handleChange(e)}
          />
        </div>
        <QuillEditor
          onChange={(value) => handleEditorChange(value)}
          contents={data.contents}
        />
        <Button>저장하기</Button>
      </form>
    </div>
  )
}

export default WriteClient
