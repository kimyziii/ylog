'use client'
import { db } from '@/firebase/firebase'
import { collection, onSnapshot, query } from 'firebase/firestore'
import { useCallback, useEffect, useState } from 'react'

interface DataType {
  title: string
  summary: string
  description?: string
  keywords: string
  content: string
  userId?: string
  userName?: string
  createdAt: Date
}

const useFetchCollection = (collectionName: string) => {
  const [data, setData] = useState<DataType[]>([])

  const getCollection = useCallback(() => {
    try {
      const docRef = collection(db, collectionName)
      const q = query(docRef)

      onSnapshot(q, (snapshot) => {
        const allData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))

        setData(allData as unknown as DataType[])
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
