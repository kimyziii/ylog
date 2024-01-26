'use client'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import styles from './PostDetailClient.module.scss'
import useFetchDocument from '@/hooks/useFetchDocument'
import { formatDate } from '@/app/util/dayjs'
import parse from 'html-react-parser'
import Link from 'next/link'
import Notiflix from 'notiflix'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '@/firebase/firebase'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { selectLoggedIn } from '@/redux/slice/authSlice'

const PostDetailClient = () => {
  const { id } = useParams()
  const router = useRouter()

  const isLoggedIn = useSelector(selectLoggedIn)
  const { document: post } = useFetchDocument('posts', String(id))
  const keywords = post.keywords
    ? post.keywords.split(',').map((m) => m.trim())
    : []

  const handleDelete = (id: string) => {
    Notiflix.Confirm.show(
      '삭제하기',
      '정말 삭제하시겠습니까?',
      '삭제',
      '취소',
      function okCb() {
        deletePost(id)
      },
      function cancelCb() {},
      {
        width: '320px',
        borderRadius: '3px',
        titleColor: '#3a2b26',
        okButtonBackground: '#3a2b26',
        cssAnimationStyle: 'zoom',
      },
    )
  }

  const handleEdit = (id: string) => {
    router.push(`/edit/${id}`)
  }

  const deletePost = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'posts', id))
      router.push('/')
    } catch (e) {
      // 에러 처리
    }
  }

  return (
    <section className={styles.section}>
      {post && (
        <>
          <header>
            <div className={styles.link}>
              <Link href={'/'}>목록으로 돌아가기</Link>
            </div>
            <div className={styles.title}>{post.title}</div>
            <div className={styles.subtitle}>
              <span className={styles.date}>
                {formatDate(post.createdAt, 'YYYY년 MM월 DD일')}
              </span>
              {keywords.length > 0 && (
                <div className={styles.keywords}>
                  {keywords.map((key) => {
                    return (
                      <div className={styles.key} key={key}>
                        {key}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
            {isLoggedIn && (
              <div className={styles.btnGroup}>
                <span onClick={() => handleEdit(String(post.id))}>수정</span>
                <span onClick={() => handleDelete(String(post.id))}>삭제</span>
              </div>
            )}
          </header>
          <div className={styles.contents}>{parse(post.contents)}</div>
        </>
      )}
    </section>
  )
}

export default PostDetailClient
