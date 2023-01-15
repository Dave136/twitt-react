import { API_URL } from '~/constant';
import AvatarNotFound from '~/assets/avatar-not-found.png';
import { useEffect, useState } from 'react';
import { createRelation, deleteRelation, getRelation } from '~/services/follow';

type Props = {
  user: User | undefined;
  loggedUser: User | undefined;
};

export default function BannerImg({ user, loggedUser }: Props) {
  const [following, setFollowing] = useState<boolean | null>(null);
  const [realoadFollow, setRealoadFollow] = useState(false);
  const bannerUrl = user?.banner ? `${API_URL}/banner?id=${user.id}` : null;
  const avatarUrl = user?.avatar
    ? `${API_URL}/avatar?id=${user.id}`
    : AvatarNotFound;

  const checkFollow = async () => {
    try {
      const response = await getRelation(user?.id as string);
      setFollowing(response.status);
    } catch (error) {
      setFollowing(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      checkFollow();
    }
    setRealoadFollow(false);
  }, [user, realoadFollow]);

  const onFollow = async () => {
    try {
      await createRelation(user?.id as string);
      setRealoadFollow(true);
    } catch (error) {
      console.log(error);
    }
  };

  const onUnfollow = async () => {
    try {
      await deleteRelation(user?.id as string);
      setRealoadFollow(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="relative bg-primary-dark-light h-[220px] mb-[60px] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bannerUrl})` }}
    >
      <div
        className="absolute -bottom-[50px] left-5 bg-primary-dark-light w-40 h-40 border-4 border-primary-dark rounded-full bg-cover bg-center"
        style={{ backgroundImage: `url(${avatarUrl})` }}
      />
      {user && (
        <div className="absolute -bottom-[55px] right-4">
          {loggedUser?._id === user.id ? (
            <a
              href="#edit"
              className="btn btn-info rounded-full text-base capitalize w-36 text-white hover:opacity-80"
            >
              Edit profile
            </a>
          ) : (
            following !== null &&
            (following ? (
              <button
                className="btn btn-info rounded-full text-base capitalize w-36 transition ease text-white group hover:btn-error hover:after:content-['Unfollow'] hover:opacity-80 hover:text-white"
                onClick={onUnfollow}
              >
                <span className="group-hover:hidden">Following</span>
              </button>
            ) : (
              <button
                className="btn btn-info rounded-full text-base capitalize w-36 text-white hover:opacity-80"
                onClick={onFollow}
              >
                Follow
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
