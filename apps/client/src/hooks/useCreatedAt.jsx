import { useEffect, useState } from 'react';

const useCreatedAt = (initialTimestamp) => {
  const [date, setDate] = useState(null);

  useEffect(() => {
    const convertTimestampToDate = (timestamp) => {
      const converetedTimestamp = `${timestamp.split(' ').join('T')}:00`;
      console.log(converetedTimestamp);
      const parsedTimestamp = new Date(converetedTimestamp);
      console.log(parsedTimestamp);
      setDate(parsedTimestamp);
    };

    convertTimestampToDate(initialTimestamp);
  }, [initialTimestamp]);

  return date;
};

export default useCreatedAt;
