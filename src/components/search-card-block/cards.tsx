import { useEffect, useState } from 'react';

import { FiMapPin } from 'react-icons/fi';
import cnBind from 'classnames/bind';
import { ResponseVacancies } from '../../models';
import { Card, Text, Group, ActionIcon, Pagination } from '@mantine/core';
import styles from './styles.module.css';
import { setFavoriteArray, useAppDispatch, useAppSelector } from '../../store';
import { Url } from '../../models/constants';

const cx = cnBind.bind(styles);

export const Cards = ({ objects }: ResponseVacancies) => {
   const favorites = useAppSelector((state) => state.commonSlice.favoriteArray);
   const [activePage, setPage] = useState(1);
   const cardsPerPage = 4;
   const startIndex = (activePage - 1) * cardsPerPage;
   const endIndex = startIndex + cardsPerPage;
   const displayedObjects = objects?.slice(startIndex, endIndex);
   const [favoriteArr, setFavoriteArr] = useState<number[] | null>(favorites);
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(setFavoriteArray(favoriteArr))
      localStorage.setItem('favoriteArray', JSON.stringify(favoriteArr));
   }
      , [favoriteArr]);


   const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, cardId: number) => {
      event.preventDefault();
      const favoriteIndex = favoriteArr?.indexOf(cardId);
      if (favoriteIndex !== undefined && favoriteIndex !== -1) {
         const updatedFavorites = favoriteArr?.filter((id) => id !== cardId);
         if (updatedFavorites !== undefined) {
            setFavoriteArr(updatedFavorites);
         }
      } else {
         const updatedFavorites = favoriteArr?.concat(cardId);
         if (updatedFavorites !== undefined) {
            setFavoriteArr(updatedFavorites);
         }
      }

   }

   return (
      <><div className={styles.cards__container}>
         {displayedObjects && displayedObjects.map((card) => (
            <Card
               key={card.id}
               radius={8}
               padding="xl"
               component="a"
               href={`${Url.PATH_VACANCY}/${card.id}`}
            >
               <Group position="apart" style={{ marginBottom: 5, marginTop: 5 }}>
                  <Text weight={500} size="lg" color=' #5E96FC;'>
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
               <Group style={{ marginBottom: 5, marginTop: 5 }}>
                  <Text weight={500}>зп от {card.payment_from} до {card.payment_to} </Text>
                  <Text weight={500} size="lg">
                     ⋅ {card.type_of_work?.title}
                  </Text>
               </Group>
               <Group style={{ marginBottom: 5, marginTop: 5 }}>
                  <ActionIcon>
                     <FiMapPin style={{ width: 16, height: 16, }} />
                  </ActionIcon>
                  <Text weight={500} size="md">
                     {card.town.title}
                  </Text>
               </Group>
            </Card>
         ))}

      </div>
         <div className={styles.pagination}>
            <Pagination total={objects.length / cardsPerPage} onChange={setPage} />
         </div>
      </>
   );
};
