import { getToken } from '~/utils';
import axios from '../config/axios';

type GetRelation = (id: string) => Promise<{ status: boolean }>;
type CreateRelation = (id: string) => Promise<void>;
type DeleteRelation = (id: string) => Promise<void>;

export const getRelation: GetRelation = async (id) => {
  try {
    const { data } = await axios.get(`/relation?id=${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return data;
  } catch (error: any) {
    throw error.response;
  }
};

export const createRelation: CreateRelation = async (id) => {
  try {
    await axios.post(
      `/relation?id=${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
  } catch (error: any) {
    throw error.response;
  }
};

export const deleteRelation: DeleteRelation = async (id) => {
  try {
    await axios.delete(`/relation?id=${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  } catch (error: any) {
    throw error.response;
  }
};
