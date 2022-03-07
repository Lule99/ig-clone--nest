-- CreateEnum
CREATE TYPE "ReactionType" AS ENUM ('LIKE', 'DISLIKE', 'LAUGH', 'ANGRY', 'SAD');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('REGULAR_USER');

-- CreateEnum
CREATE TYPE "ReactionKind" AS ENUM ('POST_REACTION', 'COMMENT_REACTION');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "bio" TEXT,
    "profilePiture" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "picture" TEXT NOT NULL DEFAULT E'default_picture_path',
    "text" TEXT DEFAULT E'',
    "publisherId" INTEGER NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reaction" (
    "id" SERIAL NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "kind" "ReactionKind" NOT NULL,
    "type" "ReactionType" NOT NULL,
    "postId" INTEGER,
    "commentId" INTEGER,

    CONSTRAINT "Reaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "commentText" TEXT NOT NULL,
    "profileId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,
    "parentCommentId" INTEGER,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProfileFollows" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_ProfileFollows_AB_unique" ON "_ProfileFollows"("A", "B");

-- CreateIndex
CREATE INDEX "_ProfileFollows_B_index" ON "_ProfileFollows"("B");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_parentCommentId_fkey" FOREIGN KEY ("parentCommentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProfileFollows" ADD FOREIGN KEY ("A") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProfileFollows" ADD FOREIGN KEY ("B") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
