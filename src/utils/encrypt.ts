import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

export const HashFunc = async (data: string): Promise<string> => {
  return await bcrypt.hash(data, 10);
};

export const CheckPassword = async (
  raw: string,
  encrypted: string,
): Promise<boolean> => {
  return await bcrypt.compare(raw, encrypted);
};



export const genJwt = (payload: any, jwtService: JwtService): string => {
  const token = jwtService.sign(payload);
  return token;
};
