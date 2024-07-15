import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import arrowIcon from './icon-arrow.svg';

function App() {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [age, setAge] = useState({ years: null, months: null, days: null });

  const calculateAge = useCallback(() => {
    if (!day || !month || !year) {
      setAge({ years: null, months: null, days: null });
      return;
    }

    const today = new Date();
    const birthDate = new Date(year, month - 1, day); // month is 0-indexed in JS Date

    if (isNaN(birthDate.getTime())) {
      setAge({ years: null, months: null, days: null });
      return;
    }

    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    let monthDiff = today.getMonth() - birthDate.getMonth();
    let dayDiff = today.getDate() - birthDate.getDate();

    if (dayDiff < 0) {
      monthDiff--;
      dayDiff += new Date(year, month, 0).getDate(); // Get the number of days in the previous month
    }

    if (monthDiff < 0) {
      calculatedAge--;
      monthDiff += 12;
    }

    setAge({ years: calculatedAge, months: monthDiff, days: dayDiff });
  }, [day, month, year]);

  useEffect(() => {
    calculateAge();
  }, [day, month, year, calculateAge]);

  return (
    <div className="container">
      <div className="input-flex">
        <div className="input-container">
          <label htmlFor="day">Day</label>
          <input
            type="number"
            id="day"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="month">Month</label>
          <input
            type="number"
            id="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="year">Year</label>
          <input
            type="number"
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
      </div>
      <button className="submit-btn" onClick={calculateAge}>
        <img src={arrowIcon} alt="Calculate" />
      </button>
      <div className="output">
        {age.years !== null && (
          <div>
            <span className="output-year age-value">{age.years}</span> <span className="age-label">years</span>
            <br />
            <span className="age-value">{age.months}</span> <span className="age-label">months</span>
            <br />
            <span className="age-value">{age.days}</span> <span className="age-label">days</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
