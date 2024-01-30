import React from 'react'
import PostDetailClient from './PostDetailClient'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase/firebase'
import { IPost } from '@/types'

async function getServerSideProps(id: string) {
  const docRef = doc(db, 'posts', String(id))
  const docSnap = await getDoc(docRef)

  let post = {} as IPost
  if (docSnap.exists()) {
    const {
      contents,
      createdAt,
      description,
      keywords,
      modifiedAt,
      title,
      userId,
      userName,
      createdDate,
    } = docSnap.data()

    post = {
      id: String(id),
      contents,
      createdAt,
      description,
      keywords,
      modifiedAt,
      title,
      userId,
      userName,
      createdDate,
    }
  }

  return { post }
}

const PostDetailPage = async ({ params }: { params: { id: string } }) => {
  const { post } = await getServerSideProps(params.id)
  return <PostDetailClient post={post} />
}

export default PostDetailPage
