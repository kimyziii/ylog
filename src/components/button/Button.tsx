import React from 'react'
import styles from './Button.module.scss'

interface ButtonProps {
  children: React.ReactNode
}

const Button = ({ children }: ButtonProps) => {
  return (
    <div className={styles.buttonWrapper}>
      <button type='submit' className={styles.button}>
        {children}
      </button>
    </div>
  )
}

export default Button
