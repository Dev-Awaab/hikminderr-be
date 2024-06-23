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
import { AdminServiceImpl } from './admin.service-impl';
import { genJwt } from 'src/utils/encrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/strategies/user-decorator.strategy';
import { AdminGuard } from 'src/user/guard/admin.guard';
import { CloudinaryService } from 'src/utils/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminServiceImpl,
    private readonly jwtService: JwtService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  async create(@Body() payload) {
    const admin = await this.adminService.createAdmin(payload);

    return {
      status: true,
      message: 'Created',
      data: admin,
    };
  }

  @Post('login')
  async login(@Body() payload) {
    const admin = await this.adminService.login(payload);

    const access_token = genJwt(
      { _id: admin._id, staffId: admin.staffId, role: admin.role },
      this.jwtService,
    );

    return {
      status: true,
      message: 'Logged in',
      data: {
        ...admin,
        access_token,
      },
    };
  }

  @Put('image')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard())
  async uploadImage(@UploadedFile() file: any, @User() staff: any) {
    const image = await this.cloudinaryService.uploadImage(file);
    const admin = await this.adminService.updateStaff({
      staffId: staff.staffId,
      image: image.secure_url,
    });

    return {
      status: true,
      message: 'Updated',
      data: admin,
    };
  }

  @Put('/forgot-password')
  async forgetPassword(
    @Body() { newPassword, staffId }: { newPassword: string; staffId: string },
  ) {
    const data = await this.adminService.changePassword(staffId, newPassword);
    return {
      status: true,
      message: 'updated',
      data,
    };
  }

  @Get('profile')
  @UseGuards(AuthGuard(), AdminGuard)
  async getStaff(@User() user: any) {
    const admin = await this.adminService.getByStaff(user.staffId);
    return {
      status: true,
      message: 'Fetched',
      data: admin,
    };
  }

  @Put('profile')
  @UseGuards(AuthGuard(), AdminGuard)
  async updateInfo(@User() user: any, @Body() payload: any) {
    const admin = await this.adminService.updateStaff({
      staffId: user.staffId,
      ...payload,
    });
    return {
      status: true,
      message: 'updated',
      data: admin,
    };
  }

  @Put('/change-password')
  @UseGuards(AuthGuard())
  async chnagePassword(
    @User() staff: any,
    @Body() { newPassword }: { newPassword: string },
  ) {
    const data = await this.adminService.changePassword(
      staff.staffId,
      newPassword,
    );
    return {
      status: true,
      message: 'updated',
      data,
    };
  }
}
