import { createBrowserRouter } from 'react-router-dom';
import Error from './error';
import Home from './home';
import Profile from './profile';
import Profiles from './profiles';
import Root from './root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        errorElement: <Error />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: '/profiles',
            element: <Profiles />,
          },
          {
            path: '/profile/:id',
            element: <Profile />,
          },
        ],
      },
    ],
  },
]);

export default router;
