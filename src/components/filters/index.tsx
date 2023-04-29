import styles from './styles.module.css';
import { Title, Button, Select, } from '@mantine/core';
import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

export const Filters = () => {
  const [selectValue, setSelectValue] = useState('');
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');

  const data = Array(50)
    .fill(0)
    .map((_, index) => ({
      value: `${index}`,
      label: `Item ${index}`,
    }));

    const handleChange = (event: string) =>{
      setSelectValue(event)
   }
   const handleChangeFrom = (event: string) =>{
    setFromValue(event)
 }
 const handleChangeTo = (event: string) =>{
  setToValue(event)
}
const handleClick = () =>{
  console.log(toValue )
}


  return (
    <form className={styles.form}>
      <div className={styles.title}>
        <Title order={2}>Фильтры</Title>
        <button className={styles.reset}>Сбросить все x</button>

      </div>
      <Select size="md" styles={{
        input: {
          borderRadius: '8px',
        }
      }} value={selectValue} placeholder="Выберете отрасль" searchable onChange={handleChange} label="Отрасль" clearable data={data} rightSection={<FiChevronDown color='rgba(172, 173, 185, 1)' size={20} />} />
      <Select size="md" styles={{
        input: {
          borderRadius: '8px',
        }
      }} value={fromValue} placeholder="От" searchable onChange={handleChangeFrom} label="Оклад" clearable data={data} />
      <Select size="md" styles={{
        input: {
          borderRadius: '8px',
        }
      }} value={toValue} placeholder="До" searchable onChange={handleChangeTo} clearable data={data} />
      <Button 
      onClick={handleClick}
      styles={{
        root: {
          borderRadius: '8px',
        }
      }}>
        Применить
      </Button>
    </form>
  );
};


