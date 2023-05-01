import { useEffect, useState } from 'react';

import { ResponseVacancies } from '../../models';
import { Pagination } from '@mantine/core';
import styles from './styles.module.css';
import { useAppSelector } from '../../store';

import { API } from '../../store/services/Service';
import { CardVacancy } from './card';
import { EmptyBlock } from '../emptyBlock';


export const Cards = ({ objects }: ResponseVacancies) => {
   const { catalogue, searchValue, payment_from, payment_to } = useAppSelector((state) => state.commonSlice);
   const [activePage, setPage] = useState(1);
   const [trigger] = API.useLazyVacanciesSearchQuery()
   const [cardsForDisplay, setCardsForDisplay] = useState(objects);
   const cardsPerPage = 4;
   const startIndex = (activePage - 1) * cardsPerPage;
   const endIndex = startIndex + cardsPerPage;
   const displayedObjects = cardsForDisplay?.slice(startIndex, endIndex);

   useEffect(() => {
      const catalogues = catalogue.split(',').map((catalogue) => catalogue.trim());
      const paymentTo = payment_to ?? undefined;
      const paymentFrom = payment_from ?? undefined;
      trigger({
         published: 1,
         keyword: searchValue,
         payment_from: paymentFrom,
         payment_to: paymentTo,
         catalogues,
      }).then((response) => {
         if (response && response.data) setCardsForDisplay(response.data.objects)
      })
         .catch((error) => {
            console.log(error);
         });
   }, [catalogue, searchValue, payment_from, payment_to, trigger]);

   return (
      <>
         {displayedObjects.length < 1 ? <EmptyBlock /> : <> <div className={styles.cards__container}>
            {displayedObjects && displayedObjects.map((card) => (
               <div key={card.id} > <CardVacancy card={card} /></div>

            ))}
         </div>
            <div className={styles.pagination}>
               <Pagination total={objects.length / cardsPerPage} onChange={setPage} />
            </div> </>}
      </>
   );
};
