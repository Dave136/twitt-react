import { getToken } from '~/utils';
import axios from '../config/axios';

type GetProfile = (id: string) => Promise<User>;
type UploadBanner = (file: File) => Promise<void>;
type UploadAvatar = (file: File) => Promise<void>;
type UpdateProfile = (user: Partial<User>) => Promise<void>;

export const getProfile: GetProfile = async (id) => {
  try {
    const { data } = await axios.get(`/profile?id=${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return data;
  } catch (error: any) {
    throw error.response;
  }
};

export const uploadBanner: UploadBanner = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('banner', file);
    await axios.post('/banner', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${getToken()}`,
      },
      onUploadProgress(event) {
        const percentage = Math.round(
          ((100 * event.loaded) / event?.total) as number
        );
        console.log('uploading percentage:', percentage);
      },
    });
  } catch (error: any) {
    throw error.response;
  }
};

export const uploadAvatar: UploadAvatar = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('avatar', file);
    await axios.post('/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${getToken()}`,
      },
      onUploadProgress: (event) => {
        const percentage = Math.round(
          ((100 * event.loaded) / event?.total) as number
        );
        console.log('uploading percentage:', percentage);
      },
    });
  } catch (error: any) {
    throw error.response;
  }
};

export const updateProfile: UpdateProfile = async (user) => {
  try {
    await axios.put(`/profile`, user, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  } catch (error: any) {
    throw error.response;
  }
};
