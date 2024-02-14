import React from 'react'
import styles from './Header.module.scss'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { SET_LOGOUT, selectLoggedIn } from '@/redux/slice/authSlice'
import { signOut } from 'firebase/auth'
import { auth } from '@/firebase/firebase'

import { TiPencil } from 'react-icons/ti'
import { MdLogout } from 'react-icons/md'

const Header = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const pathname = usePathname()

  const isLoggedIn = useSelector(selectLoggedIn)

  const nonVisiblePathname = ['/login']
  if (nonVisiblePathname.includes(pathname)) return null

  const additionalStyle = { marginBottom: '4rem' }

  const handleLogout = () => {
    signOut(auth)
    dispatch(SET_LOGOUT())
  }

  return (
    <header>
      <div
        className={styles.header}
        style={pathname === '/' ? additionalStyle : {}}
      >
        <div
          onClick={() => {
            router.push('/')
          }}
          className={styles.blogName}
        >
          Y_LOG
        </div>
        {!isLoggedIn && (
          <ul className={styles.list}>
            <li>
              <Link href='/login'>로그인</Link>
            </li>
          </ul>
        )}
        {isLoggedIn && (
          <ul className={styles.list}>
            <TiPencil
              size={20}
              onClick={() => {
                router.push('/write')
              }}
            />
            <MdLogout size={20} onClick={handleLogout} />
          </ul>
        )}
      </div>
    </header>
  )
}

export default Header
