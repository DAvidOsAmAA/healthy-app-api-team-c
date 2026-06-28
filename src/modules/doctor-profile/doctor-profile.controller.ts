import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DoctorProfileService } from './doctor-profile.service';
import { CreateDoctorProfileDto } from './dto/create-doctor-profile.dto';
import { S3Service } from '../../common/service/s3.service';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Doctor Profile')
@Controller('doctor-profile')
export class DoctorProfileController {
  constructor(
    private readonly service: DoctorProfileService,
    private readonly s3Service: S3Service,
  ) { }

  @Post()
  @ApiOperation({ summary: 'Create doctor profile with image upload' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        // لو عايز توضح DTO fields كمان
        name: { type: 'string' },
        specialty: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Doctor profile created' })
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() dto: CreateDoctorProfileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const uploaded = await this.s3Service.uploadFile(file, 'doctor-profiles');
    return this.service.create(dto, uploaded.key);
  }

  @Get()
  @ApiOperation({ summary: 'Get all doctor profiles' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get doctor profile by id' })
  @ApiParam({ name: 'id', type: String })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update doctor profile' })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id', type: String })
  @ApiBody(
    { type: CreateDoctorProfileDto }
  )
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') id: string,
    @Body() dto: Partial<CreateDoctorProfileDto>,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.service.update(id, dto, file);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete doctor profile' })
  @ApiParam({ name: 'id', type: String })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}