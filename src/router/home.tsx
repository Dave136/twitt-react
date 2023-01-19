import { useEffect, useState } from 'react';
import TweetsList from '~/components/tweets-list';
import { getFollowingTweets } from '~/services/tweet';

function mappingModel(tweets: TweetFollowing[]): Tweet[] {
  const temp: Tweet[] = [];

  tweets.forEach((tweet) => {
    temp.push({
      _id: tweet._id,
      userId: tweet.userRelationId,
      message: tweet.tweet.message,
      date: tweet.tweet.date,
    });
  });

  return temp;
}

export default function Home() {
  const [tweets, setTweets] = useState<Tweet[] | null>(null);
  const [page, setPage] = useState(1);
  const [btnLoading, setBtnLoading] = useState(false);
  const [showBtn, setShowBtn] = useState(true);

  const getAllTweets = async () => {
    try {
      const response = await getFollowingTweets(page);

      if (!tweets && response) {
        setTweets(mappingModel(response));
        return;
      }

      if (!response && tweets?.length) {
        setShowBtn(false);
        return;
      }

      const data = mappingModel(response);
      const newTweets = [...(tweets as Tweet[]), ...data] as Tweet[];
      setTweets(newTweets);
    } catch (error) {
      console.log(error);
    } finally {
      setBtnLoading(false);
    }
  };

  useEffect(() => {
    getAllTweets();
  }, [page]);

  const onLoadMore = async () => {
    setBtnLoading(true);
    setPage(page + 1);
  };

  return (
    <section>
      <header className="border-b border-b-gray-700 p-3">
        <h2 className="text-2xl font-bold">Home</h2>
      </header>
      {tweets?.length && tweets && <TweetsList tweets={tweets} />}
      <div className="flex justify-center items-center mt-4">
        {showBtn && (
          <button
            className={`btn btn-ghost ${btnLoading && 'loading'}`}
            onClick={onLoadMore}
          >
            {!btnLoading && 'Get more profiles'}
          </button>
        )}
        {!showBtn && !tweets?.length && <p>There is no more tweets</p>}
      </div>
    </section>
  );
}
