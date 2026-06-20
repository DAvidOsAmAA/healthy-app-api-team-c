import type { Request } from 'express';
import { diskStorage, memoryStorage } from 'multer';
import { StorageApproachEnum } from '../../common/interfaces/multer.storage';
import { tmpdir } from 'os';
import { randomUUID } from 'crypto';


export const fileValidation = ['image/jpeg', 'image/png', 'image/jpg'];


export const cloudMulter = ({
    storageApproach = StorageApproachEnum.DISK,
    validation = [],
    folder = 'public',
    fileSize = 1024 * 1024 * 1024,
}: {
    storageApproach?: StorageApproachEnum;
    validation?: string[];
    folder?: string;
    fileSize?: number;
}) => {
    return {
        storage:
            storageApproach === StorageApproachEnum.DISK ? diskStorage({
                destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void,
                ) => {
                    cb(null, tmpdir());
                },
                filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string,) => void,
                ) => {
                    cb(null, `${randomUUID()}-${file.originalname}`);
                },
            }): memoryStorage(),
        limits: {
            fileSize,
        },
        fileFilter: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: boolean) => void,) => {
            if (validation.includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(null, false);
            }
        },
    };
};