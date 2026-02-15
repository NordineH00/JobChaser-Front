export interface SignupData {
  pseudo: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface AuthResponse {
  message: string;
  data: string;
  user: {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    birthday: string | null;
    pseudo: string;
    avatarUrl: string | null;
    addressId: string | null;
    createdAt: string;
    updatedAt: string;
  };
}


export interface SigninData {
  email: string;
  password: string;
}
