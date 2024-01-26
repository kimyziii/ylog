import Link from 'next/link'
import styles from './pages.module.scss'

export default function NotFound() {
  return (
    <div className={styles.pages}>
      <h2>Not Found</h2>
      <p>페이지를 찾을 수 없습니다.</p>
      <Link href='/'>Return Home</Link>
    </div>
  )
}
