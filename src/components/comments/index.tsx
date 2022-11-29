import React, { FC } from 'react'
import DisplayComments from './DisplayComments'
import AddComment from './AddComment'
import styles from './style.module.scss'

interface Props {}

const Comments: FC<Props> = (props) => {
  return (
    <div className={styles.container}>
      <DisplayComments />
      <AddComment />
    </div>
  )
}

export default Comments
