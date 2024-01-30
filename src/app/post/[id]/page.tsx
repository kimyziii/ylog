import React from 'react'
import PostDetailClient from './PostDetailClient'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase/firebase'

async function getServerSideProps(id: string) {
  const docRef = doc(db, 'posts', String(id))
  const docSnap = await getDoc(docRef)

  let post = {}
  if (docSnap.exists()) {
    post = {
      id: String(id),
      ...docSnap.data(),
    }
  }

  return { post }
}

const PostDetailPage = async ({ params }: { params: { id: string } }) => {
  const { post } = await getServerSideProps(params.id)
  return <PostDetailClient post={post} />
}

export default PostDetailPage
