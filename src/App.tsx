import React, { useState } from 'react';

const App: React.FC = () => {
  const [number, setNumber] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputNumber = event.target.value;
    setNumber(inputNumber);
  };

  const renderCheckboxes = (): JSX.Element[] => {
    const checkboxes: JSX.Element[] = [];
    const maxDigitCount =
      number.length > 0
        ? Math.max(...Array.from(number).map((digit) => parseInt(digit, 10)))
        : 1;

    for (let i = 1; i <= parseInt(number, 10); i++) {
      const labelContent = `${i}`;

      checkboxes.push(
        <div
          key={i}
          style={{
            display: 'inline-block',
            boxSizing: 'border-box',
            textAlign: 'center',
            // 1行最大10個のチェックボックス
            width: `${100 / 10}%`,
            minWidth: `${maxDigitCount * 20}px`,
            whiteSpace: 'nowrap',
            // 行間
            marginBottom: '1em',
          }}
        >
          <label htmlFor={`checkbox-${i}`} style={{ fontSize: '1.5em' }}>
            {labelContent}
          </label>
          <br />
          <input
            type='checkbox'
            id={`checkbox-${i}`}
            style={{ transform: 'scale(2)' }}
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
    <div>
      <input
        type='text'
        value={number}
        onChange={handleInputChange}
        placeholder='Enter a number'
      />
      <div>{renderCheckboxes()}</div>
    </div>
  );
};

export default App;
