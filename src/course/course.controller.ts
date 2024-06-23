import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CourseServiceImpl } from './course.service-impl';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/user/guard/admin.guard';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseServiceImpl) {}

  @Post()
  @UseGuards(AuthGuard(), AdminGuard)
  async create(@Body() payload) {
    const course = await this.courseService.create(payload);

    return {
      status: true,
      message: 'Created',
      data: course,
    };
  }

  @Get()
  @UseGuards(AuthGuard())
  async getAll() {
    const courses = await this.courseService.getAll();

    return {
      status: true,
      message: 'Fetched',
      data: courses,
    };
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async get(@Param('id') id: string) {
    const course = await this.courseService.getById(id);

    return {
      status: true,
      message: 'Fetched',
      data: course,
    };
  }

  @Put('edit')
  @UseGuards(AuthGuard(), AdminGuard)
  async update(@Body() payload) {
    const course = await this.courseService.updateCourse(payload);

    return {
      status: true,
      message: 'Updated',
      data: course,
    };
  }
}
