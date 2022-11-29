import React, { FC, useState } from 'react'
import { Comment as CommentType, InputComment } from '../../../types/interfaces'
import styles from './style.module.scss'
import { Button } from '@mui/material'
import AddComment from '../AddComment'
import { RxAvatar } from 'react-icons/rx'

type Props = CommentType & { onReply: (replyTo: string, comment: InputComment) => void }

const Comment: FC<Props> = ({
  comment,
  email,
  id,
  name,
  replies,
  onReply
}) => {
  const [showReplyForm, setShowForm] = useState<boolean>(true)

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.avatar}>
          <RxAvatar />
        </div>
        <div className={styles.verticalLine}></div>
      </div>
      <div className={styles.right}>
        <div className={styles.header}>
          {name}
        </div>
        <div className={styles.body}>
          {comment}
        </div>
        <div className={styles.footer}>
          <Button
            onClick={() => setShowForm((prev) => !prev)}
          >
            Reply
          </Button>
        </div>
          <div className={styles.replies}>
          {replies.map((reply) => (
            <Comment
              key={reply.id}
              onReply={onReply}
              {...reply}
            />
          ))}
        </div>
      </div>

      {!showReplyForm && (
        <div className={styles.replyForm}>
          <AddComment onSubmit={(comment) => {
            onReply(id, comment)
            setShowForm(true)
          }} />
        </div>
      )}
    </div>
  )
}

export default Comment
