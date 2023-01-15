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

interface JwtDecode extends User {
  exp: number;
}
