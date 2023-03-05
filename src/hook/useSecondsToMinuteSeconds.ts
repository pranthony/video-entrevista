import { useState, useEffect } from 'react';

const useSecondsToMinutesSeconds = (seconds: number) => {
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const minutes = Math.floor(seconds / 60);
    const secondsRemaining = seconds % 60;
    const formattedSeconds = secondsRemaining < 10 ? `0${secondsRemaining}` : secondsRemaining.toString();
    setTimeString(`${minutes}:${formattedSeconds}`);
  }, [seconds]);

  return {
    timeString
  }
};

export default useSecondsToMinutesSeconds;
