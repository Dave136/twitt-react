interface User {
  _id: string;
  biography: string;
  birthday: string;
  email: string;
  lastname: string;
  location: string;
  name: string;
  website: string;
}

interface JwtDecode extends User {
  exp: number;
}
