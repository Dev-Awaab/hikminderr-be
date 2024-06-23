import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserServiceImpl } from './user.service-impl';
import { JwtService } from '@nestjs/jwt';
import {
  CreateUserRequestDTO,
  LoginUserRequestDTO,
  UserResponseDTO,
} from './dtos/dto/user.dto';
import { ResponseDto } from 'src/utils/response.dto';
import { genJwt } from 'src/utils/encrypt';
import { AuthGuard } from '@nestjs/passport';
import { User } from './strategies/user-decorator.strategy';
import { CloudinaryService } from 'src/utils/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserServiceImpl,
    private readonly jwtService: JwtService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  async register(@Body() request: any): Promise<ResponseDto<UserResponseDTO>> {
    const user = await this.userService.register(request);
    return {
      status: true,
      message: 'Register successfully',
      data: user,
    };
  }

  @Post('login')
  async login(
    @Body() request: LoginUserRequestDTO,
  ): Promise<ResponseDto<UserResponseDTO>> {
    const user = await this.userService.login(request);

    const access_token = genJwt(
      { _id: user._id, matricNo: user.matricNo, role: user.role },
      this.jwtService,
    );

    const data = {
      ...user,
      access_token,
    };

    return {
      status: true,
      message: 'Login successfully',
      data,
    };
  }

  @Get('students')
  async getAll(): Promise<ResponseDto<UserResponseDTO[]>> {
    const data = await this.userService.getAll();
    return {
      status: true,
      message: 'Fetched successfully',
      data,
    };
  }

  @Put('image')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard())
  async uploadImage(
    @UploadedFile() file: any,
    @User() user: any,
  ): Promise<ResponseDto<UserResponseDTO>> {
    console.log(user);
    const image = await this.cloudinaryService.uploadImage(file);
    const student = await this.userService.update(user.matricNo, {
      image: image.secure_url,
    });

    return {
      status: true,
      message: 'Updated',
      data: student,
    };
  }

  @Get('profile')
  @UseGuards(AuthGuard())
  async getProfile(@User() user: any): Promise<ResponseDto<UserResponseDTO>> {
    const profile = await this.userService.findById(user.id);

    return {
      status: true,
      message: 'Fetched',
      data: profile,
    };
  }

  @Put('profile')
  @UseGuards(AuthGuard())
  async updateProfile(@User() user: UserResponseDTO, @Body() body) {
    const profile = await this.userService.update(user.matricNo, body);

    return {
      status: true,
      message: 'Updated',
      data: profile,
    };
  }
  @Put('forgot-password')
  async forgotPassword(
    @Body()
    { newPassword, matricNo }: { newPassword: string; matricNo: string },
  ) {
    const res = await this.userService.changePassword(matricNo, newPassword);

    return {
      status: true,
      message: 'Updated',
      data: res,
    };
  }

  @Put('change-password')
  @UseGuards(AuthGuard())
  async chnagePassword(
    @User() user: UserResponseDTO,
    @Body() { newPassword }: { newPassword: string },
  ) {
    const res = await this.userService.changePassword(
      user.matricNo,
      newPassword,
    );

    return {
      status: true,
      message: 'Updated',
      data: res,
    };
  }

  @Post('enroll')
  @UseGuards(AuthGuard())
  async enroll(
    @User() user: UserResponseDTO,
    @Body() { courseIds }: { courseIds: string[] },
  ) {
    return await this.userService.enrollCourses(user.matricNo, courseIds);
  }

  @Get('enrolled')
  @UseGuards(AuthGuard())
  async getEnrolled(@User() user: UserResponseDTO) {
    const res = await this.userService.getEnrroledCourses(user._id);

    return {
      status: true,
      message: 'Fetched',
      data: res,
    };
  }
}
