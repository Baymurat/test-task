import Comment from '@components/comment';
import ShowMore from '@components/show-more';
import { Comment as CommentType, InputComment } from '@custom-types/interfaces';
import cx from 'classnames';
import React, { FC } from 'react';

import styles from './style.module.scss';

interface Props {
  comments: CommentType[]
  hasMore: boolean,
  level: number
  loadMore: () => void
  loading: boolean,
  onReply: (replyTo: string, comment: InputComment) => void
}

const CommentsList: FC<Props> = ({ comments, onReply, level, hasMore, loadMore, loading }) => (
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
);

export default CommentsList;
