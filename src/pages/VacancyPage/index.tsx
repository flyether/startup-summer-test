
import { useParams } from 'react-router-dom';
import styles from './styles.module.css';
import { API } from '../../store/services/Service';
import { Card, Text, Group, ActionIcon, } from '@mantine/core';
import { Url } from '../../models/constants';
import { FiMapPin } from 'react-icons/fi';
import cnBind from 'classnames/bind';
import { CardVacancy } from '../../components/search-card-block/card';
const cx = cnBind.bind(styles);

export const VacancyPage = () => {
  const { vacancyId } = useParams();
  const { data: card} = API.useGetVacanciesByIdQuery(vacancyId?vacancyId:'')
  

  return (
    <div className={styles.container}> 

    {card && 
    <><CardVacancy card={card} /><Card
          className={styles.card}
          radius={8}
          padding="xl"
          component="a"
          href={`${Url.PATH_VACANCY}/${card.id}`}
        >
          <Group position="apart" style={{ marginBottom: 5, marginTop: 5 }}>
            <Text weight={700} size="lg" >
              {card.profession.length > 70 ? card.profession.slice(0, 70) + "..." : card.profession}
            </Text>

          </Group>
          <Group style={{ marginBottom: 5, marginTop: 5 }}>
            <Text weight={500}>зп от {card.payment_from}  </Text>
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
        </Card></>}
     </div>
  );
};

