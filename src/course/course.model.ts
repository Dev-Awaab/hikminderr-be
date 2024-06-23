import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Course extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  venue: string;

  @Prop({ required: true })
  lecturer: string;

  @Prop({ required: true })
  status: string;

  @Prop()
  start: string;

  @Prop()
  end: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
