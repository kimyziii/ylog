import { db } from '@/firebase/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { useCallback, useEffect, useState } from 'react'

interface FetchDocumentProps {
  collectionName: string
  id: string
}

interface DataType {
  id?: string
  createdAt: Date
  title: string
  contents: string
  keywords: string

  description?: string
}

const initialValue = {
  createdAt: new Date(),
  title: '',
  contents: '',
  keywords: '',
}

const useFetchDocument = (collectionName: string, id: string) => {
  const [document, setDocument] = useState<DataType>(initialValue)

  const getDocument = useCallback(async () => {
    const docRef = doc(db, collectionName, id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const obj = {
        id,
        ...(docSnap.data() as DataType),
      }

      setDocument(obj)
    } else {
      console.log(`데이터 없음`)
    }
  }, [collectionName, id])

  useEffect(() => {
    getDocument()
  }, [getDocument])

  return { document }
}

export default useFetchDocument
