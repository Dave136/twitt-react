import { createBrowserRouter } from 'react-router-dom';
import Error from './error';
import Home from './home';
import Profile from './profile';
import Root from './root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/profile/:id',
        element: <Profile />,
      },
    ],
  },
]);

export default router;
