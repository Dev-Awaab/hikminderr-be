import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from './dtos/enum';

@Schema({ timestamps: true })
export class Admin {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ unique: true, required: true })
  staffId: string;

  @Prop()
  department: string;

  @Prop()
  email: string;

  @Prop()
  gender: string;

  @Prop()
  image: string;

  @Prop({ ref: 'Admin' })
  adminId: string;

  @Prop({ default: Role.ADMIN })
  role: Role.ADMIN;

  @Prop({ required: true })
  password: string;
  
  @Prop()
  phoneNo: string;
}

export const adminSchema = SchemaFactory.createForClass(Admin);
