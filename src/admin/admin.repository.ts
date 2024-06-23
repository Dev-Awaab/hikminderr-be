import { Injectable } from '@nestjs/common';
import { AdminRepo } from './admin.repo';
import {
  AdminQuery,
  CreatedAdmin,
  UpdateAdmin,
} from './dtos/request/admin.request';
import { AdminResponse } from './dtos/response/admin.response';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from './admin.model';

@Injectable()
export class AdminRepository implements AdminRepo {
  constructor(
    @InjectModel('Admin') private readonly adminModel: Model<Admin>,
  ) {}
  changePassword(staffId: string, newPassword: string): Promise<AdminResponse> {
    return this.adminModel.findOneAndUpdate(
      { staffId },
      { password: newPassword },
      { new: true },
    );
  }
  updateInfo(request: UpdateAdmin): Promise<AdminResponse> {
    const { staffId, ...rest } = request;
    console.log(request);
    return this.adminModel.findOneAndUpdate(
      { staffId },
      { ...rest },
      { new: true },
    );
  }
  async createAdmin(request: CreatedAdmin): Promise<AdminResponse> {
    return this.adminModel.create(request) as unknown as AdminResponse;
  }
  getByStaffId(staffId: string): Promise<AdminResponse> {
    return this.adminModel.findOne({
      staffId,
    });
  }
  getAll(): Promise<AdminResponse[]> {
    return this.adminModel.find();
  }
}
