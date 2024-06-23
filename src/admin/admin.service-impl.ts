import { Injectable } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminRepository } from './admin.repository';

@Injectable()
export class AdminServiceImpl extends AdminService {
  constructor(adminRepository: AdminRepository) {
    super(adminRepository);
  }
}
