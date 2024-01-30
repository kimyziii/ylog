'use client'
import { db } from '@/firebase/firebase'
import {
  DocumentData,
  collection,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore'
import { useCallback, useEffect, useState } from 'react'

const useFetchCollection = (collectionName: string) => {
  const [data, setData] = useState<DocumentData[]>([])

  const getCollection = useCallback(() => {
    try {
      const docRef = collection(db, collectionName)
      const q = query(docRef, orderBy('createdAt', 'desc'))

      onSnapshot(q, (snapshot) => {
        const allData = snapshot.docs.map((doc) => ({
          id: doc.id,
          createdDate: new Date(
            doc.data().createdAt.seconds * 1000 +
              doc.data().createdAt.nanoseconds / 1000000,
          ),
          ...doc.data(),
        }))

        setData(allData as unknown as DocumentData[])
      })
    } catch (e) {
      console.log(e)
    }
  }, [collectionName])

  useEffect(() => {
    getCollection()
  }, [getCollection])

  return { data }
}

export default useFetchCollection
