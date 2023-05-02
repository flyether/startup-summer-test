
import { useParams } from 'react-router-dom';
import styles from './styles.module.css';
import { API } from '../../store/services/Service';
import { Card, Text, Group, ActionIcon, } from '@mantine/core';
import { FiMapPin } from 'react-icons/fi';
import cnBind from 'classnames/bind';
import { useEffect, useState } from 'react';
import { setFavoriteArray, useAppDispatch, useAppSelector } from '../../store';
const cx = cnBind.bind(styles);

export const VacancyPage = () => {
  const { vacancyId } = useParams();
  const { data: card } = API.useGetVacanciesByIdQuery(vacancyId ? vacancyId : '')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const favoriteArray = useAppSelector((state) => state.commonSlice.favoriteArray) || [];
  const [favoriteArr, setFavoriteArr] = useState<number[]>(favoriteArray);
  const dispatch = useAppDispatch();


  useEffect(() => {
    setFavoriteArr(favoriteArray);
    localStorage.setItem("favoriteArray", JSON.stringify(favoriteArray));
  }, [favoriteArray]);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    cardId: number
  ) => {
    event.preventDefault();
    const updatedFavorites = favoriteArr ? [...favoriteArr] : [];
    const favoriteIndex = updatedFavorites.indexOf(cardId);
    if (favoriteIndex !== -1) {
      updatedFavorites.splice(favoriteIndex, 1);
    } else {
      updatedFavorites.push(cardId);
    }
    setFavoriteArr(updatedFavorites);
    dispatch(setFavoriteArray(updatedFavorites));
  };

  return (
    <div className={styles.container}>

      {card &&
        <> <Card
          className={styles.card__up}
          radius={8}
          padding="xl"
          component="a"
        >
          <Group position="apart" >
            <Text className={styles.text__vac}>
              {card.profession}
            </Text>
            <button
              onClick={(event) => handleClick(event, card.id)}
              className={cx(styles.star, {
                [styles.full__star]: favoriteArr?.includes(card.id),
                [styles.empty__star]: !favoriteArr?.includes(card.id),
              })}
            />
          </Group>
          <Group style={{ marginBottom: 9, marginTop: 7 }}>
            <Text className={styles.text__payment}>з/п от {card.payment_from} rub </Text>
            <Text className={styles.group__mid__text}>
              • &nbsp; {card.type_of_work?.title}
            </Text>
          </Group>
          <Group style={{ marginBottom: 5, marginTop: 5 }}>
            <FiMapPin style={{ width: 16, height: 16, color: '#ACADB9' }} />
            <Text className={styles.town__text}>
              {card.town.title}
            </Text>
          </Group>
        </Card>

          <Card
            className={styles.card}
            radius={8}
            padding="xl"
            component="a"
          >
            {card.work ? (
              <>
                <Text className={styles.title} >
                  Обязанности:
                </Text>
                {card.work.split(/[•!:]/).map((item, index, arr) => (
                  !item.trim() ? null :
                    <li key={index}>
                      {item.trim()}
                      {index < arr.length - 1 && <br />}
                    </li>
                ))}
              </>
            ) : null}

            {card.candidat ? (
              <>
                <Text className={styles.title} >
                  Требования:
                </Text>
                {card.candidat.split(/(?<![•])(?=[•])/).map((item, index, arr) => (
                  !item.trim() ? null :
                    <div className={styles.text} key={index}>
                      {item.trim()}
                      {index < arr.length - 1 && <br />}
                    </div>
                ))}
              </>
            ) : null}
            {card.compensation ? (
              <>
                <Text className={styles.title} >
                  Условия:
                </Text>
                {card.compensation.split(/[•!:]/).map((item, index, arr) => (
                  !item.trim() ? null :
                    <li key={index}>
                      {item.trim()}
                      {index < arr.length - 1 && <br />}
                    </li>
                ))}
              </>
            ) : null}
          </Card></>}
    </div>
  );
};

