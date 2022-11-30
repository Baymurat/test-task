import React, { FC, useState, useEffect, useRef } from 'react'
import DisplayComments from '@components/comments/display-comment'
import AddComment from '@components/comments/add-comment'
import { Comment } from '@custom-types/interfaces'
import { addComment, replyToComment, fetchComments } from '@utils/api'
import styles from './style.module.scss'

const Comments: FC = () => {
  const [comments, setComments] = useState<Comment[]>([])
  const [hasMore, setHasMore] = useState<boolean>(false)
  const [skip, setSkip] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const scrollDivRef = useRef<HTMLDivElement | null>(null)

  const fetchMoreComments = (): void => {
    setLoading(true)
    fetchComments(skip, 20)
      .then(({ data, count }) => {
        setComments((prev) => [...prev, ...data])
        setHasMore(count > skip + data.length)
        setSkip((prev) => prev + data.length)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  useEffect(() => {
    fetchMoreComments()
  }, [])

  useEffect(() => {
    scrollDivRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [comments.length])

  return (
    <div className={styles.container}>
      <div className={styles.commentsSection}>
        <DisplayComments
          loading={loading}
          hasMore={hasMore}
          loadMore={fetchMoreComments}
          level={1}
          comments={comments}
          onReply={(replyTo, comment) => {
            replyToComment(replyTo, comment)
              .then((comments) => {
                setComments([...comments])
              })
              .catch((err) => {
                console.error(err)
              })
          }}
        />
        <div style={{ float: 'left', clear: 'both' }} ref={scrollDivRef}></div>
      </div>
      <AddComment
        onSubmit={(comment) => {
          addComment(comment)
            .then((comments) => {
              setComments([...comments])
            })
            .catch((err) => {
              console.error(err)
            })
        }}
      />
    </div>
  )
}

export default Comments
