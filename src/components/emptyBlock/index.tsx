import styles from './styles.module.css';
import { Image, Text, Button } from '@mantine/core';
import empty from '../../assets/svg/empty.svg'
import { setCatalogue, setPaymentFrom, setPaymentTo, setSearchValue, useAppDispatch } from '../../store';
import { useNavigate } from 'react-router-dom';
import { Url } from '../../models/constants';


export const EmptyBlock = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(setCatalogue(''))
    dispatch(setPaymentTo(Number('')))
    dispatch(setSearchValue(''))
    dispatch(setPaymentFrom(Number('')))
    navigate(Url.PATH_FIND, { replace: true });
  }

  return (
    <div className={styles.container}>
      <Image
        className={styles.img}
        src={empty}
      />
      <Text className={styles.text}>Упс, здесь еще ничего нет!</Text>
      <Button
        onClick={handleClick}
        className={styles.button}
        styles={{
          root: {
            borderRadius: '8px',
            color: '#3B7CD3',
            background: '#DEECFF',
            margin: 'auto',
            width: '164px',
          }
        }}>Поиск Вакансий</Button>
    </div>

  );
};

