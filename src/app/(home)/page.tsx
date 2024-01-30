import PostList from '@/components/post/postList/PostList'
import { db } from '@/firebase/firebase'
import { IPost } from '@/types'
import {
  DocumentData,
  collection,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore'

const Home = async () => {
  const { posts } = await getServerSideProps()

  return (
    <>
      <PostList posts={posts} />
    </>
  )
}

async function getServerSideProps() {
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

  return { posts }
}

export default Home
