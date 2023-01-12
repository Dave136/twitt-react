import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faUsers,
  faComment,
} from '@fortawesome/free-solid-svg-icons';
import Logo from '../../assets/logo.png';
import LogoWhite from '../../assets/logo-white.png';
import BasicModal from '../../components/basic-modal';
import LoginForm from '../../components/login-form';
import RegisterForm from '../../components/register-form';
import { useRef } from 'react';

const LeftComponent = () => (
  <div className="text-center lg:text-left max-w-2xl mr-16">
    <img className="absolute top-0 -left-20 z-0 w-96" src={Logo} alt="Twitt" />
    <ul className="w-max">
      <li className="py-6 text-2xl block">
        <FontAwesomeIcon className="mr-4" icon={faSearch} /> Follow what
        interests you
      </li>
      <li className="py-6 text-2xl block">
        <FontAwesomeIcon className="mr-4" icon={faUsers} /> Find out what people
        are talking about
      </li>
      <li className="py-6 text-2xl">
        <FontAwesomeIcon className="mr-4" icon={faComment} /> Join the
        conversation
      </li>
    </ul>
  </div>
);

const RightComponent = () => (
  <div className="max-w-md">
    <img className="w-28" src={LogoWhite} alt="Twitt white" />
    <h2 className="text-4xl font-bold mb-6">
      Look what's happening in the world right now
    </h2>
    <h3 className="text-xl mb-6 font-bold">Join to Twitt right now!</h3>
    <div className="flex flex-col gap-4">
      <a href="#register" className="btn btn-info rounded-full">
        Register
      </a>
      <a href="#login" className="btn btn-outline btn-info rounded-full">
        Login
      </a>
    </div>
  </div>
);

export default function Auth() {
  const registerCloseRef = useRef<HTMLAnchorElement | null>(null);
  const loginCloseRef = useRef<HTMLAnchorElement | null>(null);

  return (
    <>
      <div className="hero min-h-screen bg-base-200 relative">
        <div className="hero-content flex-col lg:flex-row">
          <LeftComponent />
          <RightComponent />
        </div>
      </div>
      <BasicModal id="register" closeRef={registerCloseRef}>
        <header className="flex items-center justify-center">
          <img className="w-12" src={LogoWhite} alt="Twitt logo white" />
        </header>
        <section className="flex flex-col items-center justify-center">
          <h3 className="font-bold text-3xl my-4">Register</h3>
          <RegisterForm onClose={() => registerCloseRef?.current?.click()} />
        </section>
      </BasicModal>
      <BasicModal id="login" closeRef={loginCloseRef}>
        <header className="flex items-center justify-center">
          <img className="w-12" src={LogoWhite} alt="Twitt logo white" />
        </header>
        <section className="flex flex-col items-center justify-center">
          <h3 className="font-bold text-2xl">Login to Twitt</h3>
          <LoginForm onClose={() => loginCloseRef?.current?.click()} />
        </section>
      </BasicModal>
    </>
  );
}
