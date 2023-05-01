
import { API } from '../../store/services/Service';
import { Cards } from './cards';
import { Search } from './search';
import styles from './styles.module.css';

export  const SearchCardBlock = () => {
  const { data } = API.useVacanciesSearchQuery({});
  
  return (
    <div className={styles.container}>
    <Search/>
    {data && <Cards objects={data.objects}/>}
    
    </div>
  );
};


