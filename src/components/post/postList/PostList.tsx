'use client'
import React, { useEffect } from 'react'
import styles from './PostList.module.scss'
import useFetchCollection from '@/hooks/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import { STORE_POSTS, selectPosts } from '@/redux/slice/postSlice'
import { formatDate } from '@/app/util/dayjs'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

type DataType = {
  id: string
  title: string
  description: string
  contents: string
  keywords: string
  userId?: string
  userName?: string
  createdAt?: Date
}

const PostList = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const { data, isLoading } = useFetchCollection('posts')

  useEffect(() => {
    dispatch(STORE_POSTS(data))
  }, [dispatch, data])

  const posts = useSelector(selectPosts)

  return (
    <div className={styles.postList}>
      {posts.length !== 0 && (
        <>
          {posts.map((post: DataType) => {
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
                    {formatDate(post.createdAt, 'YYYY년 MM월 DD일')}
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
