import styles from './styles.module.css';
import {  Button, Select } from '@mantine/core';
import { useRef, useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { setCatalogue, setPaymentFrom, setPaymentTo, useAppDispatch } from '../../store';
import { API } from '../../store/services/Service';
import { Catalogue } from '../../models';
import { payment } from './payment';

export const Filters = () => {
  const { data: dataCatalogue } = API.useGetCataloguesQuery();
  const [selectValue, setSelectValue] = useState('');
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');
  const [isFocusArrow, setFocusArrow] = useState(false);
  const dispatch = useAppDispatch();
  let titles: { value: string; label: string; }[] = []
  const paymentIn: { value: string; label: string; }[] = payment.map((e) => ({
    value: e,
    label: e,
  }));
  const selectRef = useRef<HTMLSelectElement | null>(null);

  const handleRightSectionClick = () => {
     if (selectRef.current) {
      selectRef.current.focus();
    }
  };

  if (dataCatalogue) {
    titles = dataCatalogue.map((catalogue: Catalogue) => ({
      value: `${catalogue.key}`,
      label: catalogue.title_rus,
    }));
  }

  const Label = ({ text }: { text: string }) => {
    return (
      <div className={styles.label}>
        {text}
      </div>
    );
  };

  const handleChange = (event: string) => {
    setSelectValue(event)
  }

  const handleBlur = () => {
    setFocusArrow(false)
  }

  const handleFocus = () => {
    setFocusArrow(true)
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
        <div className={styles.title__text} >Фильтры</div>
        <button className={styles.reset} onClick={handleReset}>Сбросить все &nbsp;  x</button>
      </div>
      <Select data-elem='industry-select' size="md" styles={{
        input: {
          borderRadius: '8px',
          marginBottom: '14px'
        },
    
      }} onFocus={handleFocus} value={selectValue} placeholder="Выберете отрасль" searchable onChange={handleChange} onBlur={handleBlur} label={<Label text="Отрасль" />} clearable data={titles} rightSection={isFocusArrow ? <FiChevronUp color='#5E96FC' size={20} onClick={handleRightSectionClick}/> : <FiChevronDown onClick={handleRightSectionClick} color='rgba(172, 173, 185, 1)' size={20} />} />
      <Select data-elem='salary-from-input' size="md" styles={{
        input: {
          borderRadius: '8px',
          marginBottom: '8px',
          padding:'8px'
        },
      }} value={fromValue} placeholder="От" searchable onChange={handleChangeFrom} label={<Label text="Оклад" />} clearable data={paymentIn} />
      <Select data-elem='salary-to-input'  size="md" styles={{
        input: {
          borderRadius: '8px',
        }
      }} value={toValue} placeholder="До" searchable onChange={handleChangeTo} clearable data={paymentIn} />
      <Button
        onClick={handleClick}
        styles={{
          root: {
            borderRadius: '8px',
            marginTop: '18px',
            height:'40px'
          }
        }}>
        Применить
      </Button>
    </form>
  );
};


