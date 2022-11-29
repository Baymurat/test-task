import React, { FC } from 'react'
import LoadingButton from '@mui/lab/LoadingButton'
import styles from './style.module.scss'

interface Props {
  loadMore: () => void
  loading: boolean
}

const ShowMore: FC<Props> = ({ loadMore, loading }) => {
  return (
    <div className={styles.container}>
      <LoadingButton
        onClick={loadMore}
        loading={loading}
        variant="outlined"
      >
        Load more
      </LoadingButton>
    </div>
  )
}

export default ShowMore
