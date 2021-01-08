import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountInput } from './dtos/create-account.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<{ ok: boolean; error?: string }> {
    try {
      const exist = await this.users.findOne({ email });
      if (exist) {
        return { ok: false, error: 'email is already exist' };
      }
      this.users.save({ email, password, role });
    } catch (e) {
      return { ok: false, error: "Couldn't create account" };
    }
  }
}
