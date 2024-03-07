'use client'
import React, { useEffect, useState } from 'react'
import styles from '../../write/WriteClient.module.scss'
import { DocumentData, Timestamp, doc, setDoc } from 'firebase/firestore'
import { db } from '@/firebase/firebase'
import { useParams, useRouter } from 'next/navigation'
import useFetchDocument from '@/hooks/useFetchDocument'
import QuillEditor from '@/components/quill/QuillEditor'
import Button from '@/components/button/Button'
import { useSelector } from 'react-redux'
import { selectLoggedIn } from '@/redux/slice/authSlice'
import { Metadata } from 'next'

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
}

const PostEditClient = () => {
  const router = useRouter()

  const isLoggedIn = useSelector(selectLoggedIn)
  if (!isLoggedIn) router.push(`/not-found`)

  const { id } = useParams()
  const { document } = useFetchDocument('posts', String(id))
  const [post, setPost] = useState<DocumentData>(document)

  useEffect(() => {
    setPost(document)
  }, [document])

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget
    setPost((prev) => ({ ...prev, [name]: value } as DocumentData))
  }

  const handleEditorChange = (value: string) => {
    setPost((prev) => ({ ...prev, contents: value } as DocumentData))
  }

  const handleSubmit = async (
    e: React.SyntheticEvent<HTMLFormElement>,
    id: string,
  ) => {
    e.preventDefault()

    const obj = {
      modifiedAt: Timestamp.now().toDate(),
      ...post,
    }

    try {
      setDoc(doc(db, 'posts', id), obj)
      router.push(`/post/${id}`)
    } catch (e) {
      // 에러 처리
    } finally {
    }
  }

  return (
    <div className={styles.page}>
      <form onSubmit={(e) => handleSubmit(e, String(id))}>
        <div className={styles.title}>
          <input
            name='title'
            type='text'
            placeholder='제목'
            value={post.title}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className={styles.summary}>
          <input
            name='description'
            type='type'
            placeholder='요약'
            value={post.description}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className={styles.keywords}>
          <input
            name='keywords'
            type='type'
            placeholder='키워드'
            value={post.keywords}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <QuillEditor
          onChange={(value) => handleEditorChange(value)}
          contents={post.contents}
        />
        <Button>저장하기</Button>
      </form>
    </div>
  )
}

export default PostEditClient
