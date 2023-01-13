import { API_URL } from '~/constant';
import AvatarNotFound from '~/assets/avatar-not-found.png';

type Props = {
  user: User | undefined;
  loggedUser: User | undefined;
};

export default function BannerImg({ user, loggedUser }: Props) {
  const bannerUrl = user?.banner ? `${API_URL}/banner?id=${user.id}` : null;
  const avatarUrl = user?.avatar
    ? `${API_URL}/avatar?id=${user.id}`
    : AvatarNotFound;

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
            <button className="btn btn-info rounded-full text-base capitalize w-36 text-white hover:opacity-80">
              Follow
            </button>
          )}
        </div>
      )}
    </div>
  );
}
