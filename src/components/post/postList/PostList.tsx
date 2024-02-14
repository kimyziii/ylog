'use client'

import React, { useEffect } from 'react'
import styles from './PostList.module.scss'
import { useDispatch } from 'react-redux'
import { STORE_POSTS } from '@/redux/slice/postSlice'
import { formatDate } from '@/util/dayjs'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { IPost } from '@/types'

interface IPostListProps {
  posts: IPost[]
}

const PostList = ({ posts }: IPostListProps) => {
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(STORE_POSTS(posts))
  }, [dispatch, posts])

  return (
    <div className={styles.postList}>
      {posts.length !== 0 && (
        <>
          {posts.map((post: IPost) => {
            return (
              <section
                key={post.id}
                className={styles.post}
                onClick={() => {
                  router.push(`/post/${post.id}`)
                }}
              >
                <div className={styles.wrapper}>
                  <div className={styles.summary}>
                    <h1 className={styles.title}>{post.title}</h1>
                    <p className={styles.desc}>{post.description}</p>
                  </div>
                  <p className={styles.date}>
                    {formatDate(post.createdDate, 'YYYY. MM. DD')}
                  </p>
                </div>
              </section>
            )
          })}
        </>
      )}
    </div>
  )
}

export default PostList
