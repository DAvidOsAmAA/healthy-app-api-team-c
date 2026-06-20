import { Injectable } from '@nestjs/common';
import { CreateDoctorProfileDto } from './dto/create-doctor-profile.dto';
import { PrismaService } from '../../../prisma/prisma.service';
import { S3Service } from '../../common/service/s3.service';

@Injectable()
export class DoctorProfileService {
    constructor(private prisma: PrismaService, private readonly s3Service: S3Service,
    ) { }

    // CREATE
    create(dto: CreateDoctorProfileDto, profilePic?: string) {
        return this.prisma.doctorProfile.create({
            data: {
                ...dto,
                profilePic,
            },
        });
    }

    // GET ALL
    findAll() {
        return this.prisma.doctorProfile.findMany();
    }

    // GET ONE
    findOne(id: string) {
        return this.prisma.doctorProfile.findUnique({
            where: { id },
        });
    }

    // UPDATE
    async update(
        id: string,
        dto: Partial<CreateDoctorProfileDto>,
        file?: Express.Multer.File,
    ) {
        const doctor = await this.prisma.doctorProfile.findUnique({
            where: { id },
        });

        if (!doctor) {
            throw new Error('Doctor not found');
        }

        let profilePic = doctor.profilePic;

        if (file) {
            if (doctor.profilePic) {
                await this.s3Service.deleteFile(doctor.profilePic);
            }

            const uploaded = await this.s3Service.uploadFile(
                file,
                'doctor-profiles',
            );

            profilePic = uploaded.key;
        }

        // 3. update DB
        return this.prisma.doctorProfile.update({
            where: { id },
            data: {
                ...dto,
                profilePic,
            },
        });
    }

    // DELETE
    remove(id: string) {
        return this.prisma.doctorProfile.delete({
            where: { id },
        });
    }
}