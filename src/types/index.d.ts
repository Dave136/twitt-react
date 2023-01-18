interface User {
  _id: string;
  id?: string;
  biography: string;
  birthday: string;
  email: string;
  lastname: string;
  location: string;
  name: string;
  website: string;
  banner?: string;
  avatar?: string;
}

interface Tweet {
  _id: string;
  userId: string;
  message: string;
  date: string;
}

interface JwtDecode extends User {
  exp: number;
}

type UserType = 'new' | 'follow';
