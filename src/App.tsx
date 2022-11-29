import React, { FC } from 'react'
import Comments from './components/comments'
import styles from './App.module.scss'
import './index.scss'

const App: FC = () => {
  return (
    <div className={styles.container}>
      <Comments />
    </div>
  )
}

export default App
