import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

const headers = {
  'Content-type': 'application/json',
};

const getItem = async (id) => {
  try {
    const response = await client(`items?id=${id}`, { headers });
    if (response.data.length == 0) {
      return { message: 'Item not found' };
    }

    return response;
  } catch (error) {
    throw new error();
  }
};

const createItem = async (formData, files, authToken) => {
  try {
    files.forEach((file, index) => {
      formData.append(`file${index + 1}`, file);
    });

    const response = await client.post('items/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${authToken}`,
      },
    });
    
    console.log(response);
    console.log(2)
  } catch (error) {
    throw error;
  }
};

export { getItem, createItem };
