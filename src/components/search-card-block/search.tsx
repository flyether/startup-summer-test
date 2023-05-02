import { Button, TextInput } from '@mantine/core';

import { FiSearch } from 'react-icons/fi';
import { useState } from 'react';
import { useAppDispatch, setSearchValue } from '../../store';
import styles from './styles.module.css';

export const Search = () => {
   const [searchValue, setInputSearchValue] = useState('');
   const dispatch = useAppDispatch();
   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputSearchValue(event.target.value)
   }
   const handleClick = () => {
      dispatch(setSearchValue(searchValue))
   }
   const rightSection = (
      <div className={styles.button__box} >
         <Button
            className={styles.button}
            data-elem='search-button'
            onClick={handleClick}
         >
            Поиск
         </Button>
      </div>
   );
   return (
      <>
         <TextInput
            data-elem='search-input'
            onChange={handleChange}
            placeholder="Введите название вакансии"
            icon={<FiSearch className={styles.magnifier} />}
            rightSectionWidth={80}
            rightSection={rightSection}
            className={styles.search}
            styles={{
               input: {
                  borderRadius: '8px', height: '48px'
               }
            }}
         />
         <Button
            className={styles.button__media}
            data-elem='search-button'
            onClick={handleClick}
         >
            Поиск
         </Button>
      </>
   );
};
