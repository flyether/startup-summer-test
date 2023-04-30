
import { useParams } from 'react-router-dom';
import styles from './styles.module.css';

export const VacancyPage = () => {
  const { vacancyId } = useParams();
  console.log( vacancyId)
  return (
    <div className={styles.container}> 
      вакансия
     </div>
  );
};

