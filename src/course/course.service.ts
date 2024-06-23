import { Injectable, NotFoundException } from '@nestjs/common';
import { CourseRepo } from './course.repo';
import {
  CreateCourseRequest,
  UpdateCourseRequest,
} from './dtos/request/course.request';
import { CourseResponse } from './dtos/response/course.response';

@Injectable()
export class CourseService {
  constructor(private readonly courseRepo: CourseRepo) {}

  async create(request: CreateCourseRequest): Promise<CourseResponse> {
    return await this.courseRepo.createCourse(request);
  }

  async getById(id: string): Promise<CourseResponse> {
    const course = await this.courseRepo.getCouseById(id);

    if (!course) throw new NotFoundException('Course not found');

    return course;
  }

  async getAll(): Promise<CourseResponse[]> {
    const courses = await this.courseRepo.getCourses();

    return courses;
  }

  async updateCourse(request: UpdateCourseRequest): Promise<CourseResponse> {
    const course = await this.courseRepo.getCouseById(request.id);

    if (!course) throw new NotFoundException('Course not found');

    const updatedCourse = await this.courseRepo.updateCourse(request);

    return updatedCourse;
  }
}
