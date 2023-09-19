-- CreateTable
CREATE TABLE "Passport" (
    "id" SERIAL NOT NULL,
    "serialAndNumber" INTEGER NOT NULL,
    "birthPlace" TEXT NOT NULL,
    "dateOfIssue" TIMESTAMP(3) NOT NULL,
    "issuingAuthority" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Passport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "FCS" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "inn" INTEGER,
    "phone" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "workPlace" TEXT,
    "address" TEXT,
    "passportId" INTEGER,
    "roleId" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sentEmails" (
    "id" SERIAL NOT NULL,
    "theme" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "template" TEXT NOT NULL,
    "context" JSONB,
    "data" JSONB,

    CONSTRAINT "sentEmails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Passport_serialAndNumber_key" ON "Passport"("serialAndNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_passportId_key" ON "User"("passportId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_passportId_fkey" FOREIGN KEY ("passportId") REFERENCES "Passport"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
