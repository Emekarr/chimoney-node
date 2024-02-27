export interface CreateUserDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  transactionPin: string;
}

export interface LoginUserDTO {
  email: string;
  password: string;
}
