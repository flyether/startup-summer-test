import { Button, TextInput } from '@mantine/core';

import { FiSearch } from 'react-icons/fi';
import { useState } from 'react';
import { useAppDispatch, setSearchValue } from '../../store';

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
      <div style={{ display: 'flex', alignItems: 'center' }}>
         <Button
            data-elem='search-button'
            onClick={handleClick}
            styles={{
               root: {
                  borderRadius: '8px',
                  paddingLeft: 20,
                  paddingRight: 20,
               }
            }} >
            Поиск
         </Button>
      </div>
   );
   return (
      <TextInput
         data-elem='search-input'
         onChange={handleChange}
         placeholder="Введите название вакансии"
         icon={<FiSearch />}
         rightSectionWidth={80}
         rightSection={rightSection}
         styles={{
            rightSection: { marginRight: '10px' }, input: {
               borderRadius: '8px', height: '48px'
            }
         }}
      />
   );
};
