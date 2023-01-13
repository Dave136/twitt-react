import Toast from '../components/toast';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
import Auth from './auth';
import BasicLayout from '~/layouts/basic-layout';

function Root() {
  const { user, loadUser } = useAuth();

  if (!loadUser) return null;

  return (
    <div className="overflow-hidden">
      {user._id ? (
        <BasicLayout>
          <Outlet />
        </BasicLayout>
      ) : (
        <Auth />
      )}
      <Toast />
    </div>
  );
}

export default Root;
