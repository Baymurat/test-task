import React, { FC, useState, useEffect } from 'react'
import DisplayComments from './display-comment'
import AddComment from './add-comment'
import styles from './style.module.scss'
import { Comment } from '../../types/interfaces'
import { addComment, replyToComment, fetchComments } from '../../utils/api'

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
