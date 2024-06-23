import { Injectable } from '@nestjs/common';
import { CourseRepository } from './course.repository';
import { CourseService } from './course.service';

@Injectable()
export class CourseServiceImpl extends CourseService {
  constructor(courseRepository: CourseRepository) {
    super(courseRepository);
  }
}
