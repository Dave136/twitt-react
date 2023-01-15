import { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUser,
  faUsers,
  faPowerOff,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '~/context/auth-context';
import { removeToken } from '~/utils';
import TwittLogo from '~/assets/logo-white.png';
import BasicModal from './basic-modal';
import TweetForm from './tweet-form';

export default function AsideMenu() {
  const { user, setRefreshLogin } = useAuth();
  const closeRef = useRef<HTMLAnchorElement | null>(null);

  const logout = () => {
    removeToken();
    setRefreshLogin(true);
  };

  return (
    <aside className="flex flex-col min-h-screen border-r border-r-gray-700 pr-20">
      <header className="mb-7">
        <img className="w-14 mt-5 mr-8" src={TwittLogo} alt="Twitt Logo" />
      </header>
      <nav className="flex flex-col">
        <NavLink
          to="/"
          className="text-xl font-bold mb-8 transition ease hover:text-info"
        >
          <FontAwesomeIcon className="mr-6" icon={faHome} /> Home
        </NavLink>
        <NavLink
          to="/users"
          className="text-xl font-bold mb-8 transition ease hover:text-info"
        >
          <FontAwesomeIcon className="mr-6" icon={faUsers} /> Users
        </NavLink>
        <NavLink
          to={`/profile/${user?._id}`}
          className="text-xl font-bold mb-8 transition ease hover:text-info"
        >
          <FontAwesomeIcon className="mr-6" icon={faUser} /> Profile
        </NavLink>
        <NavLink
          to=""
          className="text-xl font-bold mb-8 transition ease hover:text-info"
          onClick={logout}
        >
          <FontAwesomeIcon className="mr-6" icon={faPowerOff} /> Logout
        </NavLink>
      </nav>
      <a href="#create-tweet" className="btn btn-info rounded-full mt-8">
        <FontAwesomeIcon className="mr-2" icon={faEdit} /> Create
      </a>
      <BasicModal id="create-tweet" closeRef={closeRef}>
        <TweetForm onClose={() => closeRef.current?.click()} />
      </BasicModal>
    </aside>
  );
}
