import React, { useState, useEffect, useContext } from 'react';
import { StatesContext } from './StatesContext';


function CountdownTimer() {
  const { allowedtime } = useContext(StatesContext);

  const [timeOver, setTimeOver] = useState(false);

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(allowedtime);
  const [seconds, setSeconds] = useState(0);

  let style = {
    'color': timeOver? 'red': 'green',
  };

  useEffect(() => {
    const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
    const timer = setInterval(() => {
      const remainingSeconds = totalSeconds - 1;
      if (remainingSeconds < 10) {
        setTimeOver(true);
      } 
      if (remainingSeconds < 0) {
        clearInterval(timer);
      } else {
        const remainingHours = Math.floor(remainingSeconds / 3600);
        const remainingMinutes = Math.floor((remainingSeconds % 3600) / 60);
        const remainingSecondsOnly = remainingSeconds % 60;
        setHours(remainingHours);
        setMinutes(remainingMinutes);
        setSeconds(remainingSecondsOnly);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [hours, minutes, seconds]);

  return (
    <div className='text-center'>
      <h3 style={style}>Remaining Time  {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</h3>
    </div>
  );
}

export default CountdownTimer;
