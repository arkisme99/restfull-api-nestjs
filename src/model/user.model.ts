export class RegiterUserRequest {
  username: string;
  password: string;
  password_confirmation: string;
  name: string;
}
export class UserResponse {
  username: string;
  name: string;
  token?: string;
}
