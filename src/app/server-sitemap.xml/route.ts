import { db } from '@/firebase/firebase'
import {
  DocumentData,
  collection,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore'
// @ts-expect-error
import { getServerSideSitemap } from 'next-sitemap'

type PostSitemap = {
  loc: string
  lastmod: string
}

const URL = process.env.SITE_URL

export async function GET(request: Request) {
  const docRef = collection(db, 'posts')
  const q = query(docRef, orderBy('createdAt', 'desc'))

  let posts: Array<PostSitemap> = []

  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((document: DocumentData) => {
    const doc = document.data()
    const obj = {
      loc: `${URL}/post/${document.id}`,
      lastmod: new Date(
        doc.modifiedAt.seconds * 1000 + doc.modifiedAt.nanoseconds / 1000000,
      ).toISOString(),
    }

    posts.push(obj)
  })

  return getServerSideSitemap(posts)
}

// 참고: https://claritydev.net/blog/nextjs-dynamic-sitemap-pages-app-directory

// export type ISitemapField = {
//   loc: string;
//   lastmod?: string;
//   changefreq?: Changefreq;
//   priority?: number;
//   alternateRefs?: Array<IAlternateRef>;
//   trailingSlash?: boolean;
//   news?: IGoogleNewsEntry;
//   images?: Array<IImageEntry>;
//   videos?: Array<IVideoEntry>;
// };
