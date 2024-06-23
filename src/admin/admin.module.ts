import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { adminSchema } from './admin.model';
import { AdminRepository } from './admin.repository';
import { AdminServiceImpl } from './admin.service-impl';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { CloudinaryService } from 'src/utils/cloudinary.service';

console.log(process.env.JWT_SECRET);
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Admin',
        schema: adminSchema,
      },
    ]),

    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: '30d',
        },
      }),
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [AdminRepository, AdminServiceImpl, CloudinaryService],
  controllers: [AdminController],
})
export class AdminModule {}
