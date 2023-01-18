import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';
import ProfilesList from '~/components/profiles-list';
import { getFollows } from '~/services/follow';

const queryParams = (location: string) => {
  const searchParams = new URLSearchParams(location);
  const tempPage = Number(searchParams?.get('page')) ?? 1;
  const type = searchParams?.get('type') ?? 'new';
  const search = searchParams?.get('search') ?? '';

  let page = tempPage === 0 ? 1 : tempPage;

  return { page, type, search };
};

const queryString = (params: Record<string, any>) =>
  new URLSearchParams(params).toString();

export default function Profiles() {
  const [usersFound, setUsersFound] = useState<User[] | null>([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const params = queryParams(location.search);
  const [userType, setUserType] = useState<UserType>(
    (params.type as UserType) || 'new'
  );
  const [btnLoading, setBtnLoading] = useState(false);
  const [showBtn, setShowBtn] = useState(true);

  const onSearch = useDebouncedCallback((value) => {
    navigate({
      search: queryString({ ...params, search: value }),
    });
  }, 1000);

  const getAllUsers = async () => {
    try {
      setLoading(true);
      const response = await getFollows({
        page: params.page,
        type: params.type as UserType,
        search: params.search,
      });

      if (+params.page === 1) {
        setUsersFound(response);
        return;
      }

      if (!response?.length || response == null) {
        setShowBtn(false);
        return;
      }

      const newUsers = [...(usersFound as User[]), ...response] as User[];

      setUsersFound(newUsers);
    } catch (error) {
      if (!usersFound?.length) {
        setUsersFound([]);
        return;
      }
    } finally {
      setLoading(false);
      setBtnLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, [location]);

  const onChangeType = (type: UserType) => {
    setUsersFound(null);
    if (type === 'new') {
      setUserType('new');
    } else {
      setUserType('follow');
    }

    navigate({
      search: queryString({
        type,
        page: '1',
        search: '',
      }),
    });
  };

  const onLoadMore = () => {
    setBtnLoading(true);
    const newPage = +params.page + 1;
    navigate({
      search: queryString({
        ...params,
        page: newPage,
      }),
    });
  };

  return (
    <section className="">
      <header className="p-3 flex items-center justify-between">
        <h2 className="text-xl">Profiles</h2>
        <input
          type="search"
          className="input input-bordered input-sm"
          placeholder="Search user"
          onChange={(e) => {
            setUsersFound(null);
            setLoading(true);
            onSearch(e.target.value);
          }}
        />
      </header>
      <div className="tabs w-full flex mt-4">
        <button
          className={`tab tab-bordered flex-1 ${
            userType === 'follow' ? 'tab-active !border-b-primary' : ''
          }`}
          onClick={() => onChangeType('follow')}
        >
          Following
        </button>
        <button
          className={`tab tab-bordered flex-1 ${
            userType === 'new' ? 'tab-active !border-b-primary' : ''
          }`}
          onClick={() => onChangeType('new')}
        >
          News
        </button>
      </div>
      {loading && !usersFound?.length ? (
        <div className="flex items-center justify-center py-12">
          <button className="btn btn-ghost loading btn-xl"></button>
        </div>
      ) : (
        !loading && (
          <>
            <ProfilesList users={usersFound} />
            <div className="flex items-center justify-center mt-4">
              {showBtn && (
                <button
                  className={`btn btn-ghost ${btnLoading && 'loading'}`}
                  onClick={onLoadMore}
                >
                  {!btnLoading && 'Get more profiles'}
                </button>
              )}
            </div>
          </>
        )
      )}
    </section>
  );
}
