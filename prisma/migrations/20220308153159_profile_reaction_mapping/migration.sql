-- AlterTable
ALTER TABLE "Reaction" ADD COLUMN     "profileId" INTEGER;

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
