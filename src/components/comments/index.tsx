import React, { FC, useState, useEffect } from 'react'
import DisplayComments from '@components/comments/display-comment'
import AddComment from '@components/comments/add-comment'
import { Comment } from '@custom-types/interfaces'
import { addComment, replyToComment, fetchComments } from '@utils/api'
import styles from './style.module.scss'

const Comments: FC = () => {
  const [comments, setComments] = useState<Comment[]>([])

  useEffect(() => {
    setComments(fetchComments(0, 20))
  }, [])

  return (
    <div className={styles.container}>
      <DisplayComments
        comments={comments}
        onReply={(replyTo, comment) => {
          replyToComment(replyTo, comment)
            .then((comments) => {
              setComments(() => [...comments])
            })
            .catch(() => {})
        }}
      />
      <AddComment
        onSubmit={(comment) => {
          addComment(comment)
            .then((comments) => {
              setComments(comments)
            })
            .catch(() => {})
        }}
      />
    </div>
  )
}

export default Comments
