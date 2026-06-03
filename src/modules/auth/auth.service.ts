import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    @InjectRedis() private readonly redis: Redis,
  ) {}
  register(dto: CreateUserDto) {
    return this.userService.create(dto);
  }
}
