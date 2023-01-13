import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { getToken, removeToken } from '../utils';

type Props = {
  children: JSX.Element | JSX.Element[];
};

type Context = {
  user: User;
  setUser: (user: User) => void;
  loadUser: boolean;
  setRefreshLogin: (status: boolean) => void;
};

const initialState = () => ({
  _id: '',
  biography: '',
  birthday: '',
  email: '',
  lastname: '',
  location: '',
  name: '',
  website: '',
});

const isExpiredToken = (token: string) => {
  const { exp } = jwtDecode<JwtDecode>(token);
  const expire = exp * 1000;
  const timeout = expire - Date.now();

  if (timeout < 0) {
    return true;
  }

  return false;
};

const AuthContext = createContext<Context>({
  user: initialState(),
  setUser: () => '',
  loadUser: true,
  setRefreshLogin: () => false,
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState(initialState());
  const [loadUser, setLoadUser] = useState(true);
  const [refreshLogin, setRefreshLogin] = useState(false);

  const isAuthenticated = () => {
    const token = getToken();

    if (!token) {
      removeToken();
      return null;
    }

    if (isExpiredToken(token)) {
      removeToken();
      return null;
    }

    return jwtDecode<User>(token);
  };

  useEffect(() => {
    setUser(isAuthenticated() ?? initialState());
    setRefreshLogin(false);
    setLoadUser(true);
  }, [refreshLogin]);

  const valueProvided = useMemo(
    () => ({
      user,
      setUser,
      loadUser,
      setRefreshLogin,
    }),
    [user]
  );

  return (
    <AuthContext.Provider value={valueProvided}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
