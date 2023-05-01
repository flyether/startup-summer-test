import styles from './styles.module.css';
import { API } from '../../store/services/Service';
import { useAppSelector } from '../../store';
import { useEffect, useState } from 'react';
import { CardProps, } from '../../models';
import { CardVacancy } from '../../components/search-card-block/card';
import { Pagination } from '@mantine/core';
import { EmptyBlock } from '../../components/emptyBlock';

export const FavoritePage = () => {
  const [trigger] = API.useLazyGetVacanciesByIdQuery()
  const favorite = useAppSelector((state) => state.commonSlice.favoriteArray)
  const [cardsForDisplay, setCardsForDisplay] = useState<CardProps[]>([]);
  
  const [activePage, setPage] = useState(1);
  const cardsPerPage = 4;
  const startIndex = (activePage - 1) * cardsPerPage;
   const endIndex = startIndex + cardsPerPage;
   const displayedObjects = cardsForDisplay?.slice(startIndex, endIndex);

  console.log(favorite  )

  useEffect(() => {
    if (favorite) {
      const fetchCards = async () => {
        try {
          const promises = favorite.map((id) => trigger(id.toString()));
          const responses = await Promise.all(promises);
          const cards = responses.map((response) => response?.data);
          const filteredCards = cards.filter((card) => card !== undefined);
          setCardsForDisplay(filteredCards as CardProps[]);
        } catch (error) {
          console.error(error);
        }
      };
      fetchCards();
    }
  }, [favorite, trigger]);

  return (
    <div className={styles.cards__container}>
      {!favorite || favorite.length <1 ? <EmptyBlock/>: <>{displayedObjects && displayedObjects.map((card) => (
        <div key={card.id + 332} > <CardVacancy card={card} /></div>
      ))}
       <div className={styles.pagination}>
        {favorite && favorite.length >0 ? <Pagination total={favorite.length / cardsPerPage} onChange={setPage} /> : null }    
         </div> </> }    
    </div>
  );
};

