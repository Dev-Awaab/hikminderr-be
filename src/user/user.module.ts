import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './user.model';
import { UserRepository } from './user.repository';
import { UserServiceImpl } from './user.service-impl';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { adminSchema } from 'src/admin/admin.model';
import { JwtStrategy } from './strategies/jwt.strategy';
import { CourseSchema } from 'src/course/course.model';
import { CloudinaryService } from 'src/utils/cloudinary.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: '30d',
        },
      }),
    }),
    MongooseModule.forFeature([
      { name: 'User', schema: userSchema },
      { name: 'Admin', schema: adminSchema },
      { name: 'Course', schema: CourseSchema },
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [UserRepository, UserServiceImpl, JwtStrategy, CloudinaryService],
  controllers: [UserController],
  exports: [JwtStrategy, PassportModule],
})
export class UserModule {}
