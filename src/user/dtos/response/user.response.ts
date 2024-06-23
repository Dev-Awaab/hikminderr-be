import { UserRole } from '../enum';

export type UserResponse = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  matricNo: string;
  gender: string;
  level: string;
  department: string;
  password: string;
  course: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  phoneNo: string;
  courses: string[];
};
