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
    return response.data.message;
  } catch (error) {
    throw new Error();
  }
};

const sendLoginData = async (formData) => {
  const headers = {
    'Content-type': 'application/json',
  }

  try {
    const data = {
      body: {
        login: formData.login, 
        password: formData.password,
      }
    }

    const response = await client.post('auth/login', data, {headers});
    return response.data.access_token;
  } catch(error) {
    throw new Error();
  }
}

const forgotPassword = (formData) => {
  const headers = {
    'Content-type':'application/json',
  }

  try {
    const data = JSON.stringify({
      body: {
        email: formData.email, 
        password: formData.password,
      }
    })
  } catch (error) {
    throw new Error();
  }
}

export { sendRegistrationData, sendLoginData };
