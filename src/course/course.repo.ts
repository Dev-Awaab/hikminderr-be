import {
  CreateCourseRequest,
  UpdateCourseRequest,
} from './dtos/request/course.request';
import { CourseResponse } from './dtos/response/course.response';

export interface CourseRepo {
  createCourse(request: CreateCourseRequest): Promise<CourseResponse>;
  getCouseById(id: string): Promise<CourseResponse>;
  getCourses(): Promise<CourseResponse[]>;
  updateCourse(request: UpdateCourseRequest): Promise<CourseResponse>;
  getCourseByUserId(userId: string): Promise<CourseResponse[]>;
}
