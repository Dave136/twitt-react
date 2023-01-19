import { useNavigate } from 'react-router-dom';
import TwittLogo from '~/assets/logo.png';

export default function Error() {
  const navigate = useNavigate();

  const goToHome = () => navigate('/');

  return (
    <div className="flex flex-col justify-center items-center mt-16">
      <img className="w-72" src={TwittLogo} alt="Twitt Logo" />
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <button className="btn btn-outline btn-info mt-4" onClick={goToHome}>
        refresh
      </button>
    </div>
  );
}
