import React, { useEffect, useRef, useState } from 'react';
import './App.css';

const App: React.FC = () => {
  const [number, setNumber] = useState<string>(() => {
    const storedNumber = localStorage.getItem('checkboxAppNumber');
    return storedNumber || '';
  });

  const [checkedCheckboxes, setCheckedCheckboxes] = useState<Set<number>>(
    () => {
      const storedCheckedCheckboxes = localStorage.getItem('checkedCheckboxes');
      return new Set<number>(
        storedCheckedCheckboxes ? JSON.parse(storedCheckedCheckboxes) : []
      );
    }
  );

  const [checkedCount, setCheckedCount] = useState<number>(
    checkedCheckboxes.size
  );

  const inputRef = useRef<HTMLInputElement | null>(null);
  const MAX_CHECKBOX: number = 500;

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setCheckedCount(checkedCheckboxes.size);
  }, [checkedCheckboxes]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputNumber = event.target.value;
    const constrainedNumber = Math.min(parseInt(inputNumber, 10), MAX_CHECKBOX);
    setNumber(constrainedNumber.toString());
  };

  const handleCheckboxChange = (checkboxNumber: number) => {
    setCheckedCheckboxes((prevChecked) => {
      const newChecked = new Set(prevChecked);
      newChecked.has(checkboxNumber)
        ? newChecked.delete(checkboxNumber)
        : newChecked.add(checkboxNumber);
      localStorage.setItem(
        'checkedCheckboxes',
        JSON.stringify(Array.from(newChecked))
      );
      return newChecked;
    });
  };

  useEffect(() => {
    localStorage.setItem('checkboxAppNumber', number);
  }, [number]);

  const renderCheckboxes = (): JSX.Element[] => {
    const checkboxes: JSX.Element[] = [];

    for (let i = 1; i <= parseInt(number, 10); i++) {
      const labelContent = `${i}`;

      checkboxes.push(
        <div key={i} className='material-checkbox'>
          <label htmlFor={`checkbox-${i}`}>{labelContent}</label>
          <br />
          <input
            type='checkbox'
            id={`checkbox-${i}`}
            checked={checkedCheckboxes.has(i)}
            onChange={() => handleCheckboxChange(i)}
          />
        </div>
      );

      if (i % 10 === 0) {
        checkboxes.push(<br key={`br-${i}`} />);
      }
    }

    return checkboxes;
  };

  return (
    <>
      <span className='check-all'>
        選択したチェックボックスの数: {checkedCount}
      </span>
      <div className='material-input-container'>
        <input
          type='number'
          value={number}
          onChange={handleInputChange}
          placeholder='Enter a number'
          ref={inputRef}
          max={MAX_CHECKBOX}
        />
        <span>作成したいチェックボックスの数を入力してください(最大: 500)</span>
      </div>
      <div>{renderCheckboxes()}</div>
    </>
  );
};

export default App;
