import axios from '../config/axios';

type LoginService = (params: {
  email: string;
  password: string;
}) => Promise<{ token: string }>;

export const registerService = async (body: Record<any, any>) => {
  try {
    const { repeatPassword, ...restBody } = body;
    const tempUser = {
      ...restBody,
      birthday: new Date(),
    };

    const { data } = await axios.post('/register', tempUser);
    return data;
  } catch (error: any) {
    throw error.response;
  }
};

export const loginService: LoginService = async (body) => {
  try {
    const { data } = await axios.post('/login', body);
    return data;
  } catch (error: any) {
    throw error.response;
  }
};
