export type UserQueryRequest = {
  _id?: string;
  matricNo?: string;
  staffID?: string;
};

export type CreateUserRequest = {
  matricNo: string;
  email: string;
  password: string;
  phoneNo: string;
};

export type LoginUserRequest = {
  matricNo: string;
  password: string;
};

export type UpdateUserRequest = {
  level?: string;
  department?: string;
  course?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  image?: string;
};
