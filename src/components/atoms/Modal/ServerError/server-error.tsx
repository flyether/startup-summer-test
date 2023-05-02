import { FC } from 'react';
import { PropsModalParent } from '../../../../models';

import styles from './errors.module.css';

export const ServerError: FC<PropsModalParent> = ({ message, close, closeParent }) => {

  return (
    <div className={styles.container}>
      <span> {message}</span>
      <button
        data-test-id="alert-close"
        className={styles.cross__icon}
        type="button"
        onClick={() => {
          close();
          if (closeParent) closeParent();
        }}
      >
        ✖
      </button>
    </div>
  );
};
