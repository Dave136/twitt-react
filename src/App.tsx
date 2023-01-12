import Toast from './components/toast';
import { useAuth } from './context/auth-context';
import Auth from './page/auth/auth';

function App() {
  const { user, loadUser } = useAuth();

  if (!loadUser) return null;

  return (
    <div>
      <h2 className="text-2xl underline font-bold"></h2>
      {user._id ? 'You are logged' : <Auth />}
      <Toast />
    </div>
  );
}

export default App;
