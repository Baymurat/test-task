import React, { FC, useState, useEffect } from 'react'
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
  const [, forceUpdate] = useState<number>(0)

  useEffect(() => {
    setLoading(true)
    fetchComments(skip, 20)
      .then(({ data, count }) => {
        setComments(data)
        setSkip(data.length)
        setHasMore(count > data.length)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  const loadMore = (): void => {
    setLoading(true)
    fetchComments(skip, 20)
      .then(({ data, count }) => {
        setComments((prev) => [...prev, ...data])
        setSkip((prev) => prev + data.length)
        setHasMore(count > skip + data.length)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <div className={styles.container}>
      <div className={styles.commentsSection}>
        <DisplayComments
          loading={loading}
          hasMore={hasMore}
          loadMore={loadMore}
          level={1}
          comments={comments}
          onReply={(replyTo, comment) => {
            replyToComment(replyTo, comment)
              .then((comments) => {
                console.log(comments)

                setComments(() => [...comments])
                forceUpdate((prev) => prev + 1)
              })
              .catch((err) => {
                console.error(err)
              })
          }}
        />
      </div>
      <AddComment
        onSubmit={(comment) => {
          addComment(comment)
            .then((comments) => {
              setComments(comments)
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
