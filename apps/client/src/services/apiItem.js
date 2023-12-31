import axios from 'axios';
import { arrayBufferToBase64 } from './arrayBufferToBase64';

const client = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

const headers = {
  'Content-type': 'application/json',
};

const getItem = async (id) => {
  try {
    const response = await client(`/items/${id}`, { headers });
    if (response.data.length == 0) {
      return { message: 'Item not found' };
    }

    return response;
  } catch (error) {
    throw new error();
  }
};

const serveFile = async (path) => {
  try {
    const response = await client(`/files/?path=${path}`, {
      responseType: 'arraybuffer',
    });
    const base64 = arrayBufferToBase64(response.data);
    const type = response.headers['content-type'];
    return { base64, type };
  } catch(error) {
    console.error;
  }
}

const createItem = async (item_name, about, files, authToken) => {
  try {
    const formData = new FormData();
    formData.append('item_name', item_name);
    formData.append('about', about);
    
    for (const file of files) {
      formData.append('files', file);
    }

    const response = await client.post('items/create', formData, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    
    console.log(response);
  } catch (error) {
    throw error;
  }
};


const getHome = async (limit = 30, offset = 0) => {
  try {
    const response = await client.get(`items/getitemslist?limit=${limit}&offset=${offset}`);
    return response.data;
  } catch(error) {
    console.error;
  }
}


export { getItem, createItem, serveFile, getHome };
