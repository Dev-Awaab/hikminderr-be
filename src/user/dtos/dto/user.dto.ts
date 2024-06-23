import {
  IsString,
  IsInt,
  IsEmail,
  IsDate,
  IsEnum,
  isPhoneNumber,
} from 'class-validator';
import { UserRole } from '../enum';
import { IsAlhikmahEmail } from './email-validator';

export class CreateUserRequestDTO {
  @IsString()
  matricNo: string;

  @IsEmail()
  @IsAlhikmahEmail()
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  phoneNo: string;
}

export class UserResponseDTO {
  @IsString()
  _id: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  email: string;

  @IsString()
  matricNo: string;

  @IsString()
  gender: string;

  @IsString()
  level: string;

  @IsString()
  department: string;

  @IsString()
  phoneNo: string;

  @IsString()
  course: string;

  @IsEnum(UserRole)
  role: UserRole;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}

export class LoginUserRequestDTO {
  @IsString()
  matricNo: string;

  @IsString()
  password: string;
}
