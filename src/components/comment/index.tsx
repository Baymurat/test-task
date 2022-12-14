import CommentForm from '@components/comment-form';
import CommentsList from '@components/comments-list';
import { Comment as CommentType, InputComment } from '@custom-types/interfaces';
import { Button } from '@mui/material';
import { useClickOutside } from '@utils/helpers';
import cx from 'classnames';
import React, { FC, useCallback,useEffect, useState } from 'react';
import { RxAvatar, RxCross2 } from 'react-icons/rx';

import styles from './style.module.scss';

type Props = CommentType & {
  level: number,
  onReply: (replyTo: string, comment: InputComment) => void
}

const maxAllowed: { [key: number]: number } = {
  1: 10,
  2: 7,
  3: 5,
  4: 3,
  5: 3,
  6: 3
};

const getNextLevel: { [key: number]: number } = {
  1: 2,
  2: 3,
  3: 4,
  4: 5,
  5: 6,
  6: 3
};

const Comment: FC<Props> = ({
  text,
  email,
  id,
  level,
  name,
  replies,
  onReply
}) => {
  const [showReplyForm, setShowForm] = useState<boolean>(false);
  const [formRef, setFormRef] = useState<HTMLDivElement | null>(null);
  const [startListen, stopListen] = useClickOutside(formRef, () => setShowForm(false));
  const getDivRef = useCallback((element: any) => setFormRef(element), []);

  const [showReplies, setShowReplies] = useState<CommentType[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [skip, setSkip] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const limit = maxAllowed[level];
  const nextLevel = getNextLevel[level];

  useEffect(() => {
    const repliesTemp = replies.slice(0, limit);
    setShowReplies(repliesTemp);
    setSkip(repliesTemp.length);
    setHasMore(replies.length > repliesTemp.length);
  }, []);

  useEffect(() => {
    if (showReplies.length + 1 === replies.length) {
      setShowReplies([...replies]);
    }
  }, [replies.length]);

  const loadMore = (): void => {
    setLoading(true);
    setTimeout(() => {
      const repliesTemp = replies.slice(skip, skip + limit);
      setShowReplies((prev) => [...prev, ...repliesTemp]);
      setSkip((prev) => prev + repliesTemp.length);
      setHasMore(replies.length > (showReplies.length + repliesTemp.length));
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (showReplyForm && formRef !== null) {
      setTimeout(startListen, 100);
      if (formRef.getBoundingClientRect().y > 640) {
        formRef.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    return () => stopListen();
  }, [showReplyForm, formRef]);

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
          <CommentsList
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
          <CommentForm onSubmit={(comment) => {
            onReply(id, comment);
            setShowForm(false);
          }} />
        </div>
      )}
    </div>
  );
};

export default Comment;
