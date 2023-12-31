import React, { useEffect, useRef, useState } from 'react';
import './App.css';

const App: React.FC = () => {
  const [number, setNumber] = useState<string>('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputNumber = event.target.value;
    setNumber(inputNumber);
  };

  const renderCheckboxes = (): JSX.Element[] => {
    const checkboxes: JSX.Element[] = [];

    for (let i = 1; i <= parseInt(number, 10); i++) {
      const labelContent = `${i}`;

      checkboxes.push(
        <div key={i} className='material-checkbox'>
          <label htmlFor={`checkbox-${i}`}>{labelContent}</label>
          <br />
          <input type='checkbox' id={`checkbox-${i}`} />
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
      <div className='material-input-container'>
        <input
          type='text'
          value={number}
          onChange={handleInputChange}
          placeholder='Enter a number'
          ref={inputRef}
        />
        <span>作成したいチェックボックスの数を入力してください</span>
      </div>
      <div>{renderCheckboxes()}</div>
    </>
  );
};

export default App;
