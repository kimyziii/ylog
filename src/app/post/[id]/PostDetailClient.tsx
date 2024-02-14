'use client'

import React from 'react'
import styles from './PostDetailClient.module.scss'
import { formatDate } from '@/util/dayjs'
import parse from 'html-react-parser'
import Link from 'next/link'
import Notiflix from 'notiflix'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '@/firebase/firebase'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { selectLoggedIn } from '@/redux/slice/authSlice'
import { IPost } from '@/types'
import Head from 'next/head'

interface IPostDetailClientProps {
  post: IPost
}

const PostDetailClient = ({ post }: IPostDetailClientProps) => {
  const isLoggedIn = useSelector(selectLoggedIn)
  const router = useRouter()
  const keywords = post.keywords
    ? post.keywords.split(',').map((m: string) => m.trim())
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
      router.push('/', undefined, { shallow: false })
    } catch (e) {
      // 에러 처리
    }
  }

  return (
    <>
      <Head>
        <meta name='title' content={post.title} />
        <meta name='description' content={post.description} />
        <meta name='robots' content='noindex, follow' />
      </Head>
      <article className={styles.section}>
        {post && (
          <>
            <div className={styles.header}>
              <div className={styles.link}>
                <Link href={'/'}>목록으로 돌아가기</Link>
              </div>
              <h1 className={styles.title}>{post.title}</h1>
              <div className={styles.subtitle}>
                <span className={styles.date}>
                  {formatDate(post.createdDate, 'YYYY년 MM월 DD일')}
                </span>
                {keywords.length > 0 && (
                  <div className={styles.keywords}>
                    {keywords.map((key: string) => {
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
                  <span onClick={() => handleDelete(String(post.id))}>
                    삭제
                  </span>
                </div>
              )}
            </div>
            <div className={styles.contents}>{parse(post.contents)}</div>
          </>
        )}
      </article>
    </>
  )
}

export default PostDetailClient
