import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SendOtpListener } from './listeners/send-otp.listener';

@Module({
  controllers: [UserController],
  providers: [UserService, SendOtpListener],
  exports: [UserService],
})
export class UserModule {}
