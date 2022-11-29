import React, { FC, useState } from 'react'
import DisplayComments from './DisplayComments'
import AddComment from './AddComment'
import styles from './style.module.scss'
import { InputComment } from '../../types/interfaces'
import { addComment, replyToComment } from '../../utils/api'

interface Props {}

const Comments: FC<Props> = (props) => {
  return (
    <div className={styles.container}>
      <DisplayComments />
      <AddComment
        onSubmit={(comment) => {
          addComment(comment)
            .then(() => {})
            .catch(() => {})
        }}
      />
    </div>
  )
}

export default Comments
