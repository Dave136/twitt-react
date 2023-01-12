import { useState } from 'react';
import Toast from './components/toast';
import Auth from './page/auth/auth';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div>
      <h2 className="text-2xl underline font-bold"></h2>
      {user ? 'You are logged' : <Auth />}
      <Toast />
    </div>
  );
}

export default App;
