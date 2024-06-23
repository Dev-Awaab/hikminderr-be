import { Injectable } from '@nestjs/common';
import { UserRepo } from './user.repo';
import { InjectModel } from '@nestjs/mongoose';
import {
  UserQueryRequest,
  CreateUserRequest,
  UpdateUserRequest,
} from './dtos/request/user.request';
import { UserResponse } from './dtos/response/user.response';
import { Model } from 'mongoose';
import { Users } from './user.model';

@Injectable()
export class UserRepository implements UserRepo {
  constructor(@InjectModel('User') private readonly userModel: Model<Users>) {}
 
  changePassword(matricNo: string, newPassword: string): Promise<UserResponse> {
    return this.userModel.findOneAndUpdate(
      { matricNo },
      { password: newPassword },
      { new: true },
    );
  }
  async updateUser(
    matricNo: string,
    request: UpdateUserRequest,
  ): Promise<UserResponse> {
    const user = await this.userModel.findOneAndUpdate(
      { matricNo },
      { ...request },
      { new: true },
    );
    console.log(user);
    return user as unknown as UserResponse;
  }

  async getAllStudents(): Promise<UserResponse[]> {
    return await this.userModel.find();
  }
  async findByIdOrMatricNo(query: UserQueryRequest): Promise<UserResponse> {
    const user = await this.userModel
      .findOne()
      .or([{ _id: query._id }, { matricNo: query.matricNo }])
      .populate('courses');

    return user as unknown as UserResponse;
  }

  async findById(id: string): Promise<UserResponse> {
    const user = await this.userModel
      .findById(id)
      .populate({
        path: 'courses',
        model: 'Course',
      })
      .exec();

    return user as unknown as UserResponse;
  }
  async registerStudent(request: CreateUserRequest): Promise<UserResponse> {
    return (await this.userModel.create(request)) as unknown as UserResponse;
  }

  async enroll(user: any, courseIds: string[]) {
    courseIds.forEach((courseId) => {
      user.courses.push(courseId);
    });
    return user.save();
  }
}
