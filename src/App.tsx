import './index.scss';

import React, { FC } from 'react';

import styles from './App.module.scss';
import Comments from './components/comments-section';

const App: FC = () => (
  <div className={styles.container}>
    <Comments />
  </div>
);

export default App;
