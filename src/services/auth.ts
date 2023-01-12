import axios from '../config/axios';

export const registerService = async (body: any) => {
  try {
    const { data } = await axios.post('/register', body);
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};
