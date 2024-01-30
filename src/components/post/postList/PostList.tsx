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
  console.log(posts)
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
              <section key={post.id} className={styles.post}>
                <div
                  className={styles.image}
                  onClick={() => {
                    router.push(`/post/${post.id}`)
                  }}
                >
                  <Image
                    src='/bg.jpg'
                    width={0}
                    height={0}
                    alt={post.title}
                    style={{ width: '100%', height: '200px' }}
                  />
                </div>
                <div className={styles.summary}>
                  <div className={styles.date}>
                    {formatDate(post.createdDate, 'YYYY년 MM월 DD일')}
                  </div>
                  <div
                    className={styles.title}
                    onClick={() => {
                      router.push(`/post/${post.id}`)
                    }}
                  >
                    {post.title}
                  </div>
                  <div className={styles.desc}>{post.description}</div>
                </div>
                <div className={styles.btnGroup}></div>
              </section>
            )
          })}
        </>
      )}
    </div>
  )
}

export default PostList
