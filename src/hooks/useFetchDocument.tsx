import { db } from '@/firebase/firebase'
import { DocumentData, doc, getDoc } from 'firebase/firestore'
import { useCallback, useEffect, useState } from 'react'

const initialValue = {
  createdAt: new Date(),
  title: '',
  contents: '',
  keywords: '',
}

const useFetchDocument = (collectionName: string, id: string) => {
  const [document, setDocument] = useState<DocumentData>(initialValue)

  const getDocument = useCallback(async () => {
    const docRef = doc(db, collectionName, id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const obj = {
        id,
        ...(docSnap.data() as DocumentData),
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
