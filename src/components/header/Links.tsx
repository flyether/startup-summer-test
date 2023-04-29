import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Url } from '../../models/constants';
import cnBind from 'classnames/bind';
import styles from './links.module.css';


const cx = cnBind.bind(styles);

export const Links = () => {
  const location = useLocation();
  const [isFind, setFind] = useState(false);
  const [isFavorite, setFavorite] = useState(false);

  useEffect(() => {
    if (location.pathname.includes('/find')) {
      setFind(true);
      setFavorite(false);
    }
    if (location.pathname.includes('/favorite')) {
      setFavorite(true);
      setFind(false);    
    }

  }, [location.pathname]);

  return (
    <div className={styles.container}>  
      <div
        className={cx({
          [styles.link__active]: isFind,
          [styles.link]: !isFind,
        })}
      >
        <Link to={Url.PATH_FIND}>Поиск Вакансий</Link>
      </div>    
        <div
          className={cx({
            [styles.link__active]: isFavorite,
            [styles.link]: !isFavorite,
          })}
        >
          <Link to={Url.PATH_FAVORITE}>Избранное</Link>
        </div>
    </div>
  );
};
