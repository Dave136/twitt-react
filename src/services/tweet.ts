import { getToken } from '~/utils';
import axios from '../config/axios';

type CreateTweet = (params: { message: string }) => Promise<void>;
type GetTweets = (id: string, page: number) => Promise<Tweet[]>;

export const createTweet: CreateTweet = async (body) => {
  try {
    await axios.post('/tweet', body);
  } catch (error: any) {
    throw error.response;
  }
};

export const getTweets: GetTweets = async (id, page) => {
  try {
    const url = `/tweet?id=${id}&page=${page}`;
    const { data } = await axios.get<Tweet[]>(url);

    return data;
  } catch (error: any) {
    throw error.response;
  }
};
