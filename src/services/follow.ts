import axios from '../config/axios';

type FollowParams = {
  page: number;
  type: UserType;
  search: string;
};

type GetRelation = (id: string) => Promise<{ status: boolean }>;
type CreateRelation = (id: string) => Promise<void>;
type DeleteRelation = (id: string) => Promise<void>;
type GetFollows = (params: FollowParams) => Promise<User[]>;

export const getRelation: GetRelation = async (id) => {
  try {
    const { data } = await axios.get(`/relation?id=${id}`);
    return data;
  } catch (error: any) {
    throw error.response;
  }
};

export const createRelation: CreateRelation = async (id) => {
  try {
    await axios.post(`/relation?id=${id}`, {});
  } catch (error: any) {
    throw error.response;
  }
};

export const deleteRelation: DeleteRelation = async (id) => {
  try {
    await axios.delete(`/relation?id=${id}`);
  } catch (error: any) {
    throw error.response;
  }
};

export const getFollows: GetFollows = async ({ page, type, search }) => {
  try {
    const url = `/following?page=${page}&type=${type}&search=${search}`;
    const { data } = await axios.get<User[]>(url);
    return data;
  } catch (error: any) {
    throw error.response;
  }
};
