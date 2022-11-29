import React, { FC, useState, useEffect, useCallback } from 'react'
import { Comment as CommentType, InputComment } from '@custom-types/interfaces'
import styles from './style.module.scss'
import { Button } from '@mui/material'
import AddComment from '@components/comments/add-comment'
import { RxAvatar, RxCross2 } from 'react-icons/rx'
import { useClickOutside } from '@utils/helpers'

type Props = CommentType & { onReply: (replyTo: string, comment: InputComment) => void }

const Comment: FC<Props> = ({
  text,
  email,
  id,
  name,
  replies,
  onReply
}) => {
  const [showReplyForm, setShowForm] = useState<boolean>(false)
  const [formRef, setFormRef] = useState<HTMLDivElement | null>(null)
  const getDivRef = useCallback((element: any) => {
    setFormRef(element)
  }, [])
  const [startListen, stopListen] = useClickOutside(formRef, () => setShowForm(false))

  useEffect(() => {
    if (showReplyForm) {
      setTimeout(() => {
        startListen()
      }, 100)
    }

    return () => stopListen()
  }, [showReplyForm, formRef])

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
          {text}
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

      {showReplyForm && (
        <div ref={getDivRef} className={styles.replyForm}>
          <RxCross2 onClick={() => setShowForm(false)} />
          <AddComment onSubmit={(comment) => {
            onReply(id, comment)
            setShowForm(false)
          }} />
        </div>
      )}
    </div>
  )
}

export default Comment
