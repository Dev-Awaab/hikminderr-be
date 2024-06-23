import { Role } from '../enum';

export type AdminResponse = {
  _id: string;
  
  firstName: string;

  lastName: string;

  email: string;

  staffId: string;

  department: string;

  gender: string;

  createdAt: Date;

  updatedAt: Date;

  password?: string;

  role: Role;

  phoneNo: string
};
