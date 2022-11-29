import React, { FC } from 'react'
import { Comment as CommentType, InputComment } from '@custom-types/interfaces'
import Comment from '@components/comments/comment'
import styles from './style.module.scss'
import ShowMore from '@components/show-more'
import cx from 'classnames'

interface Props {
  comments: CommentType[]
  onReply: (replyTo: string, comment: InputComment) => void
  level: number
  loadMore: () => void
  hasMore: boolean
  loading: boolean
}

const DisplayComments: FC<Props> = ({ comments, onReply, level, hasMore, loadMore, loading }) => {
  return (
    <div className={cx(styles.container, { [styles.level5]: level === 6 && comments.length !== 0 })}>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          onReply={onReply}
          level={level}
          {...comment}
        />
      ))}
      {hasMore && <ShowMore loadMore={loadMore} loading={loading} />}
    </div>
  )
}

export default DisplayComments
