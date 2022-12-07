import LoadingButton from '@mui/lab/LoadingButton';
import React, { FC } from 'react';

import styles from './style.module.scss';

interface Props {
  loadMore: () => void
  loading: boolean
}

const ShowMore: FC<Props> = ({ loadMore, loading }) => (
  <div className={styles.container}>
    <LoadingButton
      onClick={loadMore}
      loading={loading}
      variant="contained"
    >
        Load more
    </LoadingButton>
  </div>
);

export default ShowMore;
