import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';

@Injectable()
export class UserServiceImpl extends UserService {
  constructor(userRepository: UserRepository) {
    super(userRepository);
  }
}
