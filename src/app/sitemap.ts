import { db } from '@/firebase/firebase'
import { IPost } from '@/types/index'
import {
  collection,
  DocumentData,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const docRef = collection(db, 'posts')
  const q = query(docRef, orderBy('createdAt', 'desc'))

  let posts: Array<IPost> = []

  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((document: DocumentData) => {
    const doc = document.data()
    const obj = {
      id: document.id,
      createdDate: new Date(
        doc.createdAt.seconds * 1000 + doc.createdAt.nanoseconds / 1000000,
      ),
      ...doc,
    }

    posts.push(obj)
  })

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${process.env.SITE_URL}/post/${post.id}`,
    lastModified: new Date(
      post.modifiedAt.seconds * 1000 + post.modifiedAt.nanoseconds / 1000000,
    ).toISOString(),
  }))

  return [
    {
      url: `${process.env.SITE_URL}`,
      lastModified: new Date(),
    },
    ...postEntries,
  ]
}
