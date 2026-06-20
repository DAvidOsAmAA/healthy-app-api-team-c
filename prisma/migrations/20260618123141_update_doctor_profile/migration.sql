/*
  Warnings:

  - Added the required column `clinicsPlaces` to the `DoctorProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `consultationFees` to the `DoctorProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patientsNumber` to the `DoctorProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DoctorProfile" ADD COLUMN     "bookDate" TIMESTAMP(3),
ADD COLUMN     "clinicsPlaces" TEXT NOT NULL,
ADD COLUMN     "consultationFees" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "partOfDay" TEXT,
ADD COLUMN     "patientsNumber" INTEGER NOT NULL,
ADD COLUMN     "time" TEXT;
