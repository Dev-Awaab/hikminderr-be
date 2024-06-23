import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepo } from './user.repo';
import {
  CreateUserRequest,
  LoginUserRequest,
  UpdateUserRequest,
  UserQueryRequest,
} from './dtos/request/user.request';
import { UserResponse } from './dtos/response/user.response';
import { CheckPassword, HashFunc } from 'src/utils/encrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepo) {}
  async findByIdOrMatricNo(query: UserQueryRequest): Promise<UserResponse> {
    return await this.userRepo.findByIdOrMatricNo(query);
  }

  async findById(id: string): Promise<UserResponse> {
    return await this.userRepo.findById(id);
  }

  async register(request: CreateUserRequest): Promise<UserResponse> {
    console.log(request);
    const user = await this.findByIdOrMatricNo({ matricNo: request.matricNo });

    if (user) throw new ForbiddenException('User already exist');

    const hashedPassword = await HashFunc(request.password);

    const createdUser = await this.userRepo.registerStudent({
      ...request,
      password: hashedPassword,
    });

    return {
      firstName: createdUser.firstName,
      lastName: createdUser.lastName,
      matricNo: createdUser.matricNo,
      email: createdUser.email,
      role: createdUser.role,
      _id: createdUser._id,
      createdAt: createdUser.createdAt,
      updatedAt: createdUser.updatedAt,
      phoneNo: createdUser.phoneNo,
    } as unknown as UserResponse;
  }

  async login(request: LoginUserRequest): Promise<UserResponse> {
    const user = await this.findByIdOrMatricNo({ matricNo: request.matricNo });

    if (!user) throw new ForbiddenException("User don't exist");

    const isPasswordValid = await CheckPassword(
      request.password,
      user.password,
    );

    if (!isPasswordValid) throw new BadRequestException('Invalid Credentials');

    return {
      firstName: user.firstName,
      lastName: user.lastName,
      matricNo: user.matricNo,
      email: user.email,
      role: user.role,
      _id: user._id,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      phoneNo: user.phoneNo,
    } as unknown as UserResponse;
  }

  async getAll(): Promise<UserResponse[]> {
    return await this.userRepo.getAllStudents();
  }

  async update(
    matricNo: string,
    body: UpdateUserRequest,
  ): Promise<UserResponse> {
    const user = await this.userRepo.findByIdOrMatricNo({ matricNo });

    if (!user) throw new NotFoundException('Student not found');

    const updatedUser = await this.userRepo.updateUser(matricNo, body);

    return updatedUser;
  }

  async changePassword(
    matricNo: string,
    newPassword: string,
  ): Promise<UserResponse> {
    const user = await this.userRepo.findByIdOrMatricNo({ matricNo });

    if (!user) throw new NotFoundException('Student not found');

    const hashedPassword = await HashFunc(newPassword);

    const updatedUser = await this.userRepo.changePassword(
      matricNo,
      hashedPassword,
    );

    return updatedUser;
  }

  async enrollCourses(
    matricNo: string,
    courseIds: string[],
  ): Promise<UserResponse> {
    const user = await this.userRepo.findByIdOrMatricNo({
      matricNo,
    });

    if (!user) throw new NotFoundException('Student not found');

    // Filter out course IDs that are already enrolled
    const newCourseIds = courseIds.filter(
      (courseId) => !user.courses.includes(courseId),
    );

    if (newCourseIds.length > 0) {
      // Enroll the user in new courses
      return this.userRepo.enroll(user, newCourseIds);
    }
    return user; // Return the user if no new courses need to be added
  }

  async getEnrroledCourses(userId: string) {
    const user = await this.userRepo.findById(userId);

    if (!user) throw new NotFoundException('Student not found');

    return user.courses;
  }
}
