
import styles from './styles.module.css';
import { FiMapPin } from 'react-icons/fi';

import { ResponseVacancies } from '../../models';
import { Card, Text, Group, ActionIcon, Pagination } from '@mantine/core';
import { useState } from 'react';

export const Cards = ({ objects }: ResponseVacancies) => {
   const [activePage, setPage] = useState(1);
   return (
      <><div className={styles.cards__container}>
         {objects && objects.map((card) => (
            <Card
               key={card.id}
               radius={8}
               padding="xl"
               component="a"
               href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            >

               <Group position="apart" style={{ marginBottom: 5, marginTop: 5 }}>
                  <Text weight={500} size="lg" color=' #5E96FC;'>
                     {card.profession}
                  </Text>
                  <button className={styles.star} />
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
      <Pagination total={objects.length / 4} onChange={setPage} />
      </div>
      </>
   );
};
