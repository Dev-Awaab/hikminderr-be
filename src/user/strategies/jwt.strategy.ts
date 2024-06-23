import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from '../user.model';
import { Admin } from 'src/admin/admin.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel('User') private readonly userModel: Model<Users>,
    @InjectModel('Admin') private readonly adminModel: Model<Admin>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const { matricNo, staffId } = payload;


    let user;

    if (matricNo) {
      user = await this.userModel.findOne({ matricNo });
    }

    if (staffId) {
      user = await this.adminModel.findOne({ staffId });
    }

    console.log(user);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
