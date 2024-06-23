import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserRole } from './dtos/enum';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Users extends Document {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ unique: true, required: true })
  matricNo: string;

  @Prop()
  email: string;

  @Prop()
  gender: string;

  @Prop()
  department: string;

  @Prop()
  level: string;

  @Prop({ ref: 'User' })
  userId: string;

  @Prop()
  course: string;

  @Prop()
  image: string;

  @Prop({ type: String, enum: UserRole, default: UserRole.STUDENT })
  role: UserRole;

  @Prop({ required: true })
  password: string;

  @Prop()
  phoneNo: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Course' }] }) // Array of references
  courses: [];
}

export const userSchema = SchemaFactory.createForClass(Users);
