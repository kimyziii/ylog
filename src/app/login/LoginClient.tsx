'use client'
import React, { SyntheticEvent, useState } from 'react'
import styles from './LoginClient.module.scss'
import Button from '@/components/button/Button'
import { auth } from '@/firebase/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { SET_LOGIN } from '@/redux/slice/authSlice'
import { Notify } from 'notiflix'

type DataType = {
  email: string
  password: string
}

const initialState = {
  email: '',
  password: '',
}

interface FirebaseError extends Error {
  message: string
  code: string
}

const LoginClient = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [data, setData] = useState<DataType>(initialState)

  const onChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget
    setData((prev) => ({ ...prev, [name]: value }))
  }

  const submitHandler = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      signInWithEmailAndPassword(auth, data.email, data.password).then(() => {
        dispatch(SET_LOGIN())
      })
    } catch (e: unknown) {
      const fbError = e as FirebaseError
      Notify.failure(fbError.message)
    } finally {
      router.push('/')
    }
  }

  return (
    <section className={styles.login}>
      <form onSubmit={(e) => submitHandler(e)}>
        <div className={styles.field}>
          <label htmlFor='email'>이메일</label>
          <input
            type='text'
            name='email'
            id='email'
            value={data.email}
            placeholder='이메일 입력'
            onChange={(e) => onChangeHandler(e)}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor='password'>비밀번호</label>
          <input
            type='password'
            name='password'
            id='password'
            value={data.password}
            placeholder='비밀번호 입력'
            onChange={(e) => onChangeHandler(e)}
          />
        </div>
        <Button>로그인하기</Button>
      </form>
    </section>
  )
}

export default LoginClient
