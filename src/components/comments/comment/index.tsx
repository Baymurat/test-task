import React, { FC, useState } from 'react'
import { Comment as CommentType, InputComment } from '../../../types/interfaces'
import styles from './style.module.scss'
import { Button } from '@mui/material'
import AddComment from '../AddComment'

type Props = CommentType & { onReply: (replyTo: string, comment: InputComment) => void }

const Comment: FC<Props> = ({
  comment,
  email,
  id,
  name,
  replies
}) => {
  const [isReplyHidden, setIsReplyHidden] = useState<boolean>(true)

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {name}
      </div>
      <div className={styles.body}>
        {comment}
      </div>
      <div className={styles.footer}>
        <Button
          onClick={() => setIsReplyHidden((prev) => !prev)}
        >
          Reply
        </Button>
      </div>
      {!isReplyHidden && (
        <AddComment onSubmit={(comment) => {

        }} />
      )}
    </div>
  )
}

export default Comment
