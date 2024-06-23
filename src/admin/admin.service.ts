import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AdminRepo } from './admin.repo';
import { CreatedAdmin, UpdateAdmin } from './dtos/request/admin.request';
import { AdminResponse } from './dtos/response/admin.response';
import { CheckPassword, HashFunc } from 'src/utils/encrypt';

@Injectable()
export class AdminService {
  constructor(private readonly adminRepo: AdminRepo) {}

  async createAdmin(request: CreatedAdmin): Promise<AdminResponse> {
    const admin = await this.adminRepo.getByStaffId(request.staffId);

    if (admin) throw new BadRequestException('Account already exists');

    const hashedPassword = await HashFunc(request.password);

    const createdAdmin = await this.adminRepo.createAdmin({
      ...request,
      password: hashedPassword,
    });

    return createdAdmin;
  }

  async getByStaff(staffId: string): Promise<AdminResponse> {
    const admin = await this.adminRepo.getByStaffId(staffId);

    if (!admin) throw new NotFoundException('Account not found');

    return admin;
  }

  async getAll(): Promise<AdminResponse[]> {
    const admins = await this.adminRepo.getAll();

    return admins;
  }

  async updateStaff(request: UpdateAdmin): Promise<AdminResponse> {
    const admin = await this.adminRepo.getByStaffId(request.staffId);

    if (!admin) throw new NotFoundException('Account not found');

    const updatedStaff = await this.adminRepo.updateInfo(request);

    return updatedStaff;
  }

  async changePassword(
    staffId: string,
    newPassword: string,
  ): Promise<AdminResponse> {
    const staff = await this.adminRepo.getByStaffId(staffId);

    if (!staff) throw new NotFoundException('Staff not found');

    const hashedPassword = await HashFunc(newPassword);

    const updProfile = await this.adminRepo.changePassword(
      staffId,
      hashedPassword,
    );

    return updProfile;
  }

  async login(request): Promise<AdminResponse> {
    const admin = await this.adminRepo.getByStaffId(request.staffId);

    if (!admin) throw new ForbiddenException("Account don't exist");

    const isPasswordValid = await CheckPassword(
      request.password,
      admin.password,
    );

    if (!isPasswordValid) throw new BadRequestException('Invalid Credentials');

    return {
      firstName: admin.firstName,
      lastName: admin.lastName,
      staffId: admin.staffId,
      email: admin.email,
      role: admin.role,
      _id: admin._id,
      createdAt: admin.createdAt,
      updatedAt: admin.updatedAt,
      gender: admin.gender,
      department: admin.department,
      phoneNo: admin.phoneNo
    };
  }
}
