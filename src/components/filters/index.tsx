import styles from './styles.module.css';
import { Title, Button, Select, } from '@mantine/core';
import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { setCatalogue, setPaymentFrom, setPaymentTo, useAppDispatch } from '../../store';
import { API } from '../../store/services/Service';
import { Catalogue } from '../../models';
import { payment } from './payment';

export const Filters = () => {
  const { data: dataCatalogue } = API.useGetCataloguesQuery();
  const [selectValue, setSelectValue] = useState('');
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');
  const dispatch = useAppDispatch();
  let titles: { value: string; label: string; }[] = []

  if (dataCatalogue) {
    titles = dataCatalogue.map((catalogue: Catalogue) => ({
      value: `${catalogue.key}`,
      label: catalogue.title_rus,
    }));
  }

  const handleChange = (event: string) => {
    setSelectValue(event)
  }
  const handleChangeFrom = (event: string) => {
    setFromValue(event)
  }
  const handleChangeTo = (event: string) => {
    setToValue(event)
  }
  const handleClick = () => {
    dispatch(setCatalogue(selectValue))
    if (toValue) dispatch(setPaymentTo(Number(toValue)))

    if (fromValue) dispatch(setPaymentFrom(Number(fromValue)))
  }
  const handleReset = () => {
    setToValue('')
    setSelectValue('')
    setFromValue('')
    dispatch(setCatalogue(selectValue))
    if (toValue) dispatch(setPaymentTo(Number(toValue)))

    if (fromValue) dispatch(setPaymentFrom(Number(fromValue)))
  }

  return (
    <form className={styles.form}>
      <div className={styles.title}>
        <Title order={2}>Фильтры</Title>
        <button className={styles.reset} onClick={handleReset}>Сбросить все x</button>

      </div>
      <Select  size="md" styles={{
        input: {
          borderRadius: '8px',
        }
      }} value={selectValue} placeholder="Выберете отрасль" searchable onChange={handleChange} label="Отрасль" clearable data={titles} rightSection={<FiChevronDown color='rgba(172, 173, 185, 1)' size={20} />}    />
      <Select size="md" styles={{
        input: {
          borderRadius: '8px',
        }
      }} value={fromValue} placeholder="От" searchable onChange={handleChangeFrom} label="Оклад" clearable data={payment} />
      <Select size="md" styles={{
        input: {
          borderRadius: '8px',
        }
      }} value={toValue} placeholder="До" searchable onChange={handleChangeTo} clearable data={payment} />
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


