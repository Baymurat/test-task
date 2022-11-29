import React, { FC } from 'react'
import { Comment as CommentType, InputComment } from '../../../types/interfaces'
import Comment from '../../comments/comment'
import styles from './style.module.scss'

interface Props {
  comments: CommentType[]
  onReply: (replyTo: string, comment: InputComment) => void
}

const DisplayComments: FC<Props> = ({ comments, onReply }) => {
  return (
    <div className={styles.container}>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          onReply={onReply}
          {...comment}
        />
      ))}
    </div>
  )
}

export default DisplayComments
