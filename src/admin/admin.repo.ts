import { AdminQuery, CreatedAdmin, UpdateAdmin } from './dtos/request/admin.request';
import { AdminResponse } from './dtos/response/admin.response';

export interface AdminRepo {
  createAdmin(request: CreatedAdmin): Promise<AdminResponse>;
  getByStaffId(staffId: string): Promise<AdminResponse>;
  getAll(): Promise<AdminResponse[]>;
  updateInfo(request:UpdateAdmin): Promise<AdminResponse>
  changePassword(staffId: string, newPassword: string): Promise<AdminResponse>;
}
