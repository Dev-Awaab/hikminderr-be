import { Injectable } from '@nestjs/common';
import { CourseRepo } from './course.repo';
import {
  CreateCourseRequest,
  UpdateCourseRequest,
} from './dtos/request/course.request';
import { CourseResponse } from './dtos/response/course.response';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from './course.model';

@Injectable()
export class CourseRepository implements CourseRepo {
  constructor(
    @InjectModel('Course') private readonly courseModel: Model<Course>,
  ) {}
  getCourseByUserId(userId: string): Promise<CourseResponse[]> {
   return this.courseModel.find({
    
   })
  }
  async createCourse(request: CreateCourseRequest): Promise<CourseResponse> {
    return this.courseModel.create(request) as unknown as CourseResponse;
  }
  getCouseById(id: string): Promise<CourseResponse> {
    return this.courseModel.findById(id);
  }
  getCourses(): Promise<CourseResponse[]> {
    return this.courseModel.find();
  }
  updateCourse(request: UpdateCourseRequest): Promise<CourseResponse> {
    return this.courseModel.findByIdAndUpdate(
      { _id: request.id },
      { ...request },
      { new: true },
    );
  }
}
