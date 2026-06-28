// s3.service.ts

import {
    S3Client,
    PutObjectCommand,
    GetObjectCommand,
    DeleteObjectCommand,
    ListObjectsV2Command,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Readable } from 'stream';
import { randomUUID } from 'crypto';
@Injectable()
export class S3Service {
    private readonly s3: S3Client;
    private readonly bucket = process.env.AWS_BUCKET_NAME!;

    constructor() {
        this.s3 = new S3Client({
            region: process.env.AWS_REGION!,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
            },
        });
    }

    // =========================
    // CREATE (UPLOAD FILE)
    // =========================
    async uploadFile(
        file: Express.Multer.File,
        folder = 'uploads',
    ): Promise<{
        key: string;
        url: string;
    }> {
        const key = `${folder}/${randomUUID()}-${file.originalname}`;

        await this.s3.send(
            new PutObjectCommand({
                Bucket: this.bucket,
                Key: key,
                Body: file.buffer,
                ContentType: file.mimetype,
            }),
        );

        return {
            key,
            url: await this.getSignedUrl(key),
        };
    }

    // =========================
    // READ (SIGNED URL)
    // =========================
    async getSignedUrl(key: string): Promise<string> {
        const command = new GetObjectCommand({
            Bucket: this.bucket,
            Key: key,
        });

        return await getSignedUrl(this.s3, command, {
            expiresIn: 3600,
        });
    }
    // =========================
    // READ (STREAM FILE)
    // =========================
    async getFileStream(key: string): Promise<Readable> {
        const result = await this.s3.send(
            new GetObjectCommand({
                Bucket: this.bucket,
                Key: key,
            }),
        );

        return result.Body as Readable;
    }

    // =========================
    // UPDATE (REPLACE FILE)
    // =========================
    async updateFile(key: string, file: Express.Multer.File) {
        await this.s3.send(
            new PutObjectCommand({
                Bucket: this.bucket,
                Key: key,
                Body: file.buffer,
                ContentType: file.mimetype,
            }),
        );

        return {
            key,
            url: await this.getSignedUrl(key),
        };
    }

    // =========================
    // DELETE FILE
    // =========================
    async deleteFile(key: string) {
      const result =  await this.s3.send(
            new DeleteObjectCommand({
                Bucket: this.bucket,
                Key: key,
            }),
        );

        return {
            deleted: true,
            key,
            result
        };
    }

    // =========================
    // LIST FILES
    // =========================
    async listFiles(prefix = 'uploads/') {
        const result = await this.s3.send(
            new ListObjectsV2Command({
                Bucket: this.bucket,
                Prefix: prefix,
            }),
        );

        return (
            result.Contents?.map((file) => ({
                key: file.Key,
                size: file.Size,
                lastModified: file.LastModified,
            })) || []
        );
    }
}