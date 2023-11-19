import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

const sendRegistrationData = async (formData) => {
  const headers = {
    'Content-type': 'application/json',
  };

  try {
    const data = JSON.stringify({
      body: {
        first_name: formData.firstName,
        last_name: formData.lastName,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      },
    });

    const response = await client.post('auth/registration', data, { headers });
    return response;
  } catch (error) {
    return false;
    throw new error();
  }
};

const verification = async (formData) => {
  const headers = {
    'Content-type': 'application/json',
  };

  try {
    const data = {
      body: {
        verification_code: formData.code,
        email: formData.email,
        password: formData.password,
      },
    };

    const response = await client.post('auth/verification', data, { headers });
    localStorage.setItem('token', `${response.data.access_token}`);
    return true;
  } catch (error) {
    return false;
    console.log(error);
  }
};

const sendLoginData = async (formData) => {
  const headers = {
    'Content-type': 'application/json',
  };

  try {
    const data = {
      body: {
        login: formData.login,
        password: formData.password,
      },
    };

    const response = await client.post('auth/login', data, { headers });
    localStorage.setItem('token', `${response.data.access_token}`);
    return true;
  } catch (error) {
    return false;
  }
};

const sendVerificationCode = async (formData) => {
  const headers = {
    'Content-type': 'application/json',
  };

  try {
    const data = JSON.stringify({
      body: {
        email: formData.email,
      },
    });

    const response = await client.post('auth/sendverificationcode', data, {
      headers,
    });
    return response.data.message;
  } catch (error) {
    throw new Error();
  }
};

const forgotPassword = async (formData) => {
  const headers = {
    'Content-type': 'application/json',
  };

  try {
    const data = JSON.stringify({
      body: {
        email: formData.email,
        new_password: formData.password,
        verification_code: formData.code,
      },
    });
    const response = await client.post('auth/forgotpassword', data, {
      headers,
    });
    return response.data.message;
  } catch (error) {
    throw new error();
  }
};

export {
  sendRegistrationData,
  sendLoginData,
  sendVerificationCode,
  forgotPassword,
  verification,
};
