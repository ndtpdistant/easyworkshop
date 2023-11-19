import axios from 'axios';
import { arrayBufferToBase64 } from './arrayBufferToBase64';

const client = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

const defaultPfp = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkARo4ysVZ2I7A7E9bZAL9nTO5B5eX_VLX9x_x-ve4m6XrtryNNBHDgBWLAQ&s';
const defaultBg = 'https://t3.ftcdn.net/jpg/03/76/74/78/360_F_376747823_L8il80K6c2CM1lnPYJhhJZQNl6ynX1yj.jpg';

const blobToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

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
    const defaultResponse = await fetch(defaultPfp);
    const defaultBlob = await defaultResponse.blob();
    const base64 = await blobToBase64(defaultBlob);
    const type = defaultResponse.headers.get('content-type');
    return { base64, type };
  }
};

const getBackgroundPicture = async (id) => {
  try {
    const response = await client.get(`users/backgroundpicture?id=${id}`, {
      responseType: 'arraybuffer',
    });
    const base64 = arrayBufferToBase64(response.data);
    const type = response.headers['content-type'];
    return { base64, type };
  } catch (error) {
    const defaultResponse = await fetch(defaultBg);
    const defaultBlob = await defaultResponse.blob();
    const base64 = await blobToBase64(defaultBlob);
    const type = defaultResponse.headers.get('content-type');
    return { base64, type };
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
