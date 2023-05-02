import { Filters } from '../../components/filters';
import { SearchCardBlock } from '../../components/search-card-block/search-card-block';
import styles from './styles.module.css';

export const WelcomePage = () => {
  return (
    <div className={styles.container}>
      <Filters />
      <SearchCardBlock />
    </div>
  );
};

