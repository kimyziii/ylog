'use client'
import React from 'react'
import WriteClient from './WriteClient'
import { useSelector } from 'react-redux'
import { selectLoggedIn } from '@/redux/slice/authSlice'
import NotFound from '../not-found'

const WritePage = () => {
  const isLoggedIn = useSelector(selectLoggedIn)
  if (isLoggedIn) return <WriteClient />
  else return <NotFound />
}

export default WritePage
