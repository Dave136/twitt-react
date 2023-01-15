import { useEffect, useState } from 'react';
import { getProfile } from '~/services/profile';
import AvatarNotFound from '~/assets/avatar-not-found.png';
import { API_URL } from '~/constant';
import { injectLink } from '~/utils';

const formatDate = (date: string) => {
  const calendar = new Intl.RelativeTimeFormat('en-US', {
    localeMatcher: 'lookup',
    numeric: 'auto',
    style: 'long',
  }).format(-new Date(date).getDay(), 'day');

  const hours = new Intl.DateTimeFormat('en-US', {
    timeStyle: 'short',
  }).format(new Date(date));

  return `${calendar} at ${hours}`;
};

function Tweet({ tweet }: { tweet: Tweet }) {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const getAllUserInfo = async () => {
    try {
      const response = await getProfile(tweet.userId);
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
  }, [tweet]);

  return (
    <div className="flex px-5 py-2 border-b border-b-gray-700">
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
            {formatDate(tweet.date)}
          </span>
        </div>
        <div
          className="tweet-message"
          dangerouslySetInnerHTML={{
            __html: injectLink(tweet.message),
          }}
        />
      </div>
    </div>
  );
}

export default function TweetsList({ tweets }: { tweets: Tweet[] }) {
  return (
    <div>
      {tweets.map((tweet) => (
        <Tweet tweet={tweet} key={tweet._id} />
      ))}
    </div>
  );
}
