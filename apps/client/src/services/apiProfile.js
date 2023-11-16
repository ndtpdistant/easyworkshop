import axios from 'axios';
import { arrayBufferToBase64 } from './arrayBufferToBase64';

const client = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

const getProfile = async (id) => {
  try {
    const response = await client.get(`/users/userdata?id=${id}`);
    const data = response.data;
    return data;
  } catch (error) {
    return false;
  }
};

const getProfilePicture = async (id) => {
  try {
    const response = await client.get(`users/profilepicture?id=${id}`, {
      responseType: 'arraybuffer',
    });
    const base64 = arrayBufferToBase64(response.data);
    const type = response.headers['content-type'];
    return { base64, type };
  } catch (error) {
    return null;
  }
};

const getBackgroundPicture = async (id) => {
  try {
    const response = await client.get(`users/backgroundpicture?id=${id}}`, {
      responseType: 'arraybuffer',
    });
    const base64 = arrayBufferToBase64(response.data);
    const type = response.headers['content-type'];
    return { base64, type };
  } catch (error) {
    return null;
  }
};

const changeProfilePicture = async (jwt, file) => {
  const headers = {
    Authorization: `Bearer ${jwt}`,
    'Content-Type': 'multipart/form-data',
  };

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await client.post('users/changeprofilepicture', formData, {
      headers,
    });
  } catch (error) {}
};

const changeBackgroundPicture = async (jwt, file) => {
  const headers = {
    Authorization: `Bearer ${jwt}`,
    'Content-Type': 'multipart/form-data',
  };

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await client.post(
      'users/changebackgroundpicture',
      formData,
      {
        headers,
      },
    );
  } catch (error) {}
};

export {
  getProfile,
  getProfilePicture,
  getBackgroundPicture,
  changeProfilePicture,
  changeBackgroundPicture,
};
