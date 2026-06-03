import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/wasm-compiler-edge';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { randomUUID } from 'crypto';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventEmitter: EventEmitter2,
  ) {}
  async create(dto: CreateUserDto) {
    const passwordHash = await bcrypt.hash(dto.password, 10);

    try {
      const user = await this.prisma.user.create({
        data: {
          name: dto.name,
          email: dto.email,
          gender: dto.gender,
          passwordHash,
        },
      });
      this.eventEmitter.emit('user.registered', {
        userId: user.id,
        email: user.email,
      });
      const transactionId = randomUUID();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();
      return {
        transactionId,
        message: 'Verification code has been successfully dispatched.',
        expiresAt,
      };
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Email already in use');
      }
      throw new InternalServerErrorException();
    }
  }
}
