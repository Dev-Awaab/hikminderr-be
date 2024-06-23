import {
  CreateUserRequest,
  UpdateUserRequest,
  UserQueryRequest,
} from './dtos/request/user.request';
import { UserResponse } from './dtos/response/user.response';
import { Users } from './user.model';

export interface UserRepo {
  findByIdOrMatricNo(query: UserQueryRequest): Promise<UserResponse>;
  registerStudent(request: CreateUserRequest): Promise<UserResponse>;
  getAllStudents(): Promise<UserResponse[]>;
  updateUser(
    matricNo: string,
    request: UpdateUserRequest,
  ): Promise<UserResponse>;
  changePassword(matricNo: string, newPassword: string): Promise<UserResponse>;
  enroll(user: any, courseIds: string[]);
  findById(id: string): Promise<UserResponse>;
 
}
