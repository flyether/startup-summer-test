import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Url } from '../../models/constants';
import cnBind from 'classnames/bind';
import styles from './links.module.css';
import { Burger } from '@mantine/core';

const cx = cnBind.bind(styles);

export const Links = () => {
  const location = useLocation();
  const [isFind, setFind] = useState(false);
  const [isFavorite, setFavorite] = useState(false);
  const [opened, setOpened] = useState(false);
  const title = opened ? 'Close navigation' : 'Open navigation';
  const NavigationBlockRef = useRef<HTMLDivElement>(null);
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

  const handleLinkClick = () => {
    setOpened(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
       if (NavigationBlockRef.current && !NavigationBlockRef.current.contains(event.target as Node)) {
        setOpened(false);
       }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
       document.removeEventListener('click', handleClickOutside);
    };
 }, [opened]);

  return (
    <>
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
    <div ref={NavigationBlockRef}  >
    <Burger
    className={styles.burger}
      opened={opened}
      onClick={() => setOpened((o) => !o)}
      title={title}
    />
    {opened &&  <div className={styles.container__burger}>  
      <div
        className={cx({
          [styles.link__active]: isFind,
          [styles.link]: !isFind,
        })}
      >
        <Link onClick={handleLinkClick} to={Url.PATH_FIND}>Поиск Вакансий</Link>
      </div>    
        <div
          className={cx({
            [styles.link__active]: isFavorite,
            [styles.link]: !isFavorite,
          })}
        >
          <Link onClick={handleLinkClick} to={Url.PATH_FAVORITE}>Избранное</Link>
        </div>
    </div> }
    </div>
    </>
  );
};
