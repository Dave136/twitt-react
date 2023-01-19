import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '~/services/profile';
import AvatarNotFound from '~/assets/avatar-not-found.png';
import { API_URL } from '~/constant';

export default function Profile({ user }: { user: User }) {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const navigate = useNavigate();

  const getAllUserInfo = async () => {
    try {
      const response = await getProfile(user.id as string);
      setUserInfo(response);
      setAvatarUrl(
        response?.avatar
          ? `${API_URL}/avatar?id=${response.id}`
          : AvatarNotFound
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUserInfo();
  }, []);

  return (
    <div
      className="flex px-5 py-3 border-b border-b-gray-700 transition ease hover:bg-gray-700 hover:cursor-pointer"
      onClick={() => navigate(`/profile/${userInfo?.id}`)}
    >
      <div className="avatar">
        <div className="w-12 rounded-full">
          <img src={avatarUrl as string} />
        </div>
      </div>
      <div className="ml-4">
        <div className="font-bold">
          {userInfo?.name && userInfo.name}{' '}
          {userInfo?.lastname && userInfo.lastname}
          <span className="ml-3 text-xs font-normal text-gray-500">
            {userInfo?.biography}
          </span>
        </div>
      </div>
    </div>
  );
}
