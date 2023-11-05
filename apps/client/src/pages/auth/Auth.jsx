import { useEffect, useState } from 'react';
import Button from '../../components/Button';

import * as style from './Auth.module.scss';

const Auth = (pros) => {
  const [auth, setAuth] = useState(false);

  const title = 'Join us today';

  useEffect(() => {
    title = auth ? 'Glad to see you' : 'Join us today';
  }, []);

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className="title_wrapper">
          <h1 className="title">{title}</h1>
          <h2 className="subtitle">
            Lorem ipsum dolor sit amet consectetur adipiscing elit nulla
            adipiscing tincidunt interdum tellus du.
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Auth;
