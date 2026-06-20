import { Module } from '@nestjs/common';
import { DoctorProfileService } from './doctor-profile.service';
import { DoctorProfileController } from './doctor-profile.controller';
import { S3Service } from '../../common/service/s3.service';

@Module({
  controllers: [DoctorProfileController],
  providers: [DoctorProfileService,S3Service],
})
export class DoctorProfileModule {}
