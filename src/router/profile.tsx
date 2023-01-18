import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import BannerImg from '~/components/banner-img';
import BasicModal from '~/components/basic-modal';
import EditForm from '~/components/edit-form';
import InfoUser from '~/components/info-user';
import TweetsList from '~/components/tweets-list';
import { useAuth } from '~/context/auth-context';
import { useToast } from '~/context/toast-context';
import { getProfile } from '~/services/profile';
import { getTweets } from '~/services/tweet';

export default function Profile() {
  const [user, setUser] = useState<User>();
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [page, setPage] = useState(1);
  const [loadingTweets, setLoadingTweets] = useState<boolean | number>(false);
  const [showBtn, setShowBtn] = useState(true);
  const params = useParams();
  const { toast } = useToast();
  const { user: loggedUser } = useAuth();
  const editCloseRef = useRef<HTMLAnchorElement | null>(null);

  const getUserProfile = async () => {
    try {
      const profile = await getProfile(params?.id ?? '');
      setUser(profile);
    } catch (error) {
      console.error(error);
      toast.error('User not exist');
    }
  };

  const getAllTweets = async () => {
    try {
      const data = await getTweets(params.id as string, 1);
      setTweets(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, [params.id]);

  useEffect(() => {
    getAllTweets();
  }, [params.id]);

  const loadMoreTweets = async () => {
    try {
      const tempPage = page + 1;
      setLoadingTweets(true);
      setPage(tempPage);

      const newTweets = await getTweets(params.id as string, tempPage);

      if (!newTweets?.length || newTweets == null) {
        setShowBtn(false);
        return;
      }

      setTweets([...tweets, ...newTweets]);
      setLoadingTweets(false);
      setShowBtn(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <BannerImg user={user} loggedUser={loggedUser} />
      <InfoUser user={user} />
      <div>
        <h3 className="p-4 text-lg border-b border-b-gray-700">Tweets</h3>
        {tweets && <TweetsList tweets={tweets} />}
        <div className="flex justify-center mt-4">
          {showBtn && (
            <button
              className={`btn btn-ghost ${loadingTweets && 'loading'}`}
              onClick={loadMoreTweets}
            >
              {!loadingTweets && 'Get more tweets'}
            </button>
          )}
        </div>
      </div>
      <BasicModal id="edit" closeRef={editCloseRef}>
        <section className="flex flex-col items-center justify-center">
          <h3 className="font-bold text-2xl">Edit profile</h3>
          <EditForm
            user={user}
            onClose={() => editCloseRef?.current?.click()}
          />
        </section>
      </BasicModal>
    </section>
  );
}
