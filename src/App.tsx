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
  const fileInputRef = useRef<HTMLInputElement | null>(null);
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

  const handleExportCSV = () => {
    // CSVデータの生成
    const checkboxes = Array.from(checkedCheckboxes)
      .map((checkbox) => `"${checkbox}"`)
      .join(',');

    const csvData = `"チェック一覧",${checkboxes}`;

    const completeCSVData = `"${number}"\n${csvData}`;

    const blob = new Blob([completeCSVData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'checkbox_data.csv';
    a.click();

    URL.revokeObjectURL(url);
  };

  const handleImportCSV = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csvContent = e.target?.result as string;
        // CSVデータをパース
        parseAndApplyCSVData(csvContent);
      };

      reader.readAsText(file);
    }
  };

  const parseAndApplyCSVData = (csvContent: string) => {
    const lines = csvContent.trim().split('\n');

    // "チェック一覧" はスキップ
    if (lines[0].trim() === '"チェック一覧"') {
      lines.shift();
    }

    const [importedNumber, ...importedCheckboxes] = lines
      .map((line) => line.split(',').map((item) => item.replace(/"/g, '')))
      .flat();

    setNumber(importedNumber);
    setCheckedCheckboxes(new Set(importedCheckboxes.map(Number)));
    console.log(importedNumber);

    // ローカルストレージにも保存
    localStorage.setItem('checkboxAppNumber', importedNumber);
    localStorage.setItem(
      'checkedCheckboxes',
      JSON.stringify(importedCheckboxes.map(Number))
    );
  };

  const unCheckedAll = () => {
    // チェックボックス全解除
    const confirmDelete = window.confirm(
      'チェックをすべて外します。よろしいですか？'
    );

    if (confirmDelete) {
      setCheckedCheckboxes(new Set());
      localStorage.removeItem('checkedCheckboxes');
    }
  };

  return (
    <>
      <div className='check-all'>
        チェック : {checkedCount}
        <div className='csv'>
          <button onClick={handleExportCSV} className='export-button'>
            CSVエクスポート
          </button>
          <label className='import-label' htmlFor='fileInput'>
            CSVインポート
          </label>
          <input
            id='fileInput'
            type='file'
            accept='.csv'
            ref={fileInputRef}
            onChange={handleImportCSV}
            style={{ display: 'none' }}
          />
          <button onClick={unCheckedAll} className='unchecked-button'>
            チェックをすべて外す
          </button>
        </div>
      </div>
      <div className='material-input-container'>
        <input
          type='number'
          value={number}
          onChange={handleInputChange}
          placeholder='Checkbox (Max: 500)'
          ref={inputRef}
          max={MAX_CHECKBOX}
        />
      </div>
      <div>{renderCheckboxes()}</div>
    </>
  );
};

export default App;
