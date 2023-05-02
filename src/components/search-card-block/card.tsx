/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { FiMapPin } from 'react-icons/fi';
import cnBind from 'classnames/bind';
import { CardProps } from '../../models';
import { Card, Text, Group, ActionIcon, } from '@mantine/core';
import styles from './styles.module.css';
import { setFavoriteArray, useAppDispatch, useAppSelector } from '../../store';
import { Url } from '../../models/constants';

const cx = cnBind.bind(styles);

export const CardVacancy = ({ card }: { card: CardProps }) => {
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
      <Card
         data-elem={`vacancy-${card.id}`}
         className={styles.card}
         radius={8}
         padding="xl"
         component="a"
         href={`${Url.PATH_VACANCY}/${card.id}`}
      >
         <Group position="apart" className={styles.group__up}>
            <Text className={styles.text}>
               {card.profession.length > 55 ? card.profession.slice(0, 55) + "..." : card.profession}
            </Text>
            <button
               data-elem={`vacancy-${card.id}-shortlist-button`}
               onClick={(event) => handleClick(event, card.id)}
               className={cx(styles.star, {
                  [styles.full__star]: favoriteArr?.includes(card.id),
                  [styles.empty__star]: !favoriteArr?.includes(card.id),
               })}
            />
         </Group>
         <Group className={styles.group__mid}>
            <Text weight={700}>з/п от {card.payment_from} rub </Text>
            <Text className={styles.group__mid__text}>
               • &nbsp; {card.type_of_work?.title}
            </Text>
         </Group>
         <Group className={styles.group__down}>
     
               <FiMapPin style={{ width: 16, height: 16, color: '#ACADB9' }} />
           
            <Text weight={400} size="md">
               {card.town.title}
            </Text>
         </Group>
      </Card>
   );
};
