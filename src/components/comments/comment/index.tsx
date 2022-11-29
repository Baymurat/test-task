import React, { FC, useState, useEffect, useCallback } from 'react'
import { Comment as CommentType, InputComment } from '@custom-types/interfaces'
import styles from './style.module.scss'
import { Button } from '@mui/material'
import AddComment from '@components/comments/add-comment'
import { RxAvatar, RxCross2 } from 'react-icons/rx'
import { useClickOutside } from '@utils/helpers'
import DisplayComments from '@components/comments/display-comment'
import cx from 'classnames'

type Props = CommentType & {
  onReply: (replyTo: string, comment: InputComment) => void
  level: number
}

const maxAllowed: { [key: number]: number } = {
  1: 10,
  2: 7,
  3: 5,
  4: 3,
  5: 3,
  6: 3
}

const Comment: FC<Props> = ({
  text,
  email,
  id,
  level,
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

  const [showReplies, setShowReplies] = useState<CommentType[]>([])
  const [hasMore, setHasMore] = useState<boolean>(false)
  const [skip, setSkip] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)

  const limit = maxAllowed[level]
  const nextLevel = level + 1 === 7 ? 3 : level + 1

  useEffect(() => {
    const repliesTemp = replies.slice(0, limit)
    setShowReplies(repliesTemp)
    setSkip(repliesTemp.length)
    setHasMore(replies.length > repliesTemp.length)
  }, [])

  const loadMore = (): void => {
    setLoading(true)
    setTimeout(() => {
      const repliesTemp = replies.slice(skip, skip + limit)
      setShowReplies((prev) => [...prev, ...repliesTemp])
      setSkip((prev) => prev + repliesTemp.length)
      setHasMore(replies.length > (showReplies.length + repliesTemp.length))
      setLoading(false)
    }, 1000)
  }

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
          <Button onClick={() => setShowForm((prev) => !prev)} >
            Reply
          </Button>
        </div>
        <div className={cx(styles.replies, { [styles.level5]: nextLevel === 6 && showReplies.length !== 0 })}>
          <DisplayComments
            loading={loading}
            hasMore={hasMore}
            loadMore={loadMore}
            level={nextLevel}
            comments={showReplies}
            onReply={onReply}
          />
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
