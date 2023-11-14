import { useEffect, useState } from 'react';

const useCreatedAt = (initialTimestamp) => {
  const [date, setDate] = useState(null);

  useEffect(() => {
    const convertTimestampToDate = (timestamp) => {
      const converetedTimestamp = `${timestamp.split(' ').join('T')}:00`;
      const parsedTimestamp = new Date(converetedTimestamp);
      setDate(
        `${parsedTimestamp.getMonth() + 1} ${parsedTimestamp.toLocaleDateString(
          'en-US',
          { month: 'long' },
        )}, ${parsedTimestamp.getFullYear()}`,
      );
    };

    convertTimestampToDate(initialTimestamp);
  }, [initialTimestamp]);

  return date;
};

export default useCreatedAt;
