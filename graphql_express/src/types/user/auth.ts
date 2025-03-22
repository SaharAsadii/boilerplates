export interface ForgetPasswordQuery {
  username: string;
}

export interface ChangePasswordQuery {
  code: string;
  password: string;
}

export interface ChangePasswordBody {
  userId: string;
  password: string;
}

export interface ChangePasswordType {
  userId: string;
  password: string;
}

export interface LoginType {
  username: string;
  password: string;
}

export interface ChangePasswordType {
  userId: string;
  password: string;
}
