import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseSchema } from './course.model';
import { CourseRepository } from './course.repository';
import { CourseServiceImpl } from './course.service-impl';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Course',
        schema: CourseSchema,
      },
    ]),
    UserModule,
  ],
  providers: [CourseRepository, CourseServiceImpl],
  controllers: [CourseController],
})
export class CourseModule {}
