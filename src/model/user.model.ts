export class RegiterUserRequest {
  username: string;
  password: string;
  password_confirmation: string;
  name: string;
  refresh_token?: string;
}
export class UserResponse {
  id: string;
  username: string;
  name: string;
  accessToken?: string;
  refreshToken?: string;
}

export class LoginUserRequest {
  username: string;
  password: string;
}

export class UpdateUserRequest {
  password?: string;
  name?: string;
  refresh_token?: string;
}

export class LogoutResponse {
  data: boolean;
}
