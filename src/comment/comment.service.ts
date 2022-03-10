import { Injectable } from '@nestjs/common';
import { Profile } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { NewCommentDto } from './dto';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async getAllForPost(postId: number, page: number, size: number) {
    return await this.prisma.comment.findMany({
      take: size,
      skip: page * size,
      where: {
        active: true,
        postId: postId,
      },
    });
  }

  async getAllForComment(commentId: number, page: number, size: number) {
    return await this.prisma.comment.findMany({
      take: size,
      skip: page * size,
      where: {
        active: true,
        parentCommentId: commentId,
      },
    });
  }

  async getOne(id: number) {
    return await this.prisma.comment.findFirst({
      where: {
        active: true,
        id: id,
      },
    });
  }

  async publish(profile: Profile, dto: NewCommentDto) {
    return await this.prisma.comment.create({
      data: {
        commentText: dto.text,
        profile: {
          connect: {
            id: profile.id,
          },
        },
        parentComment: {
          connect: {
            id: dto.commentedEntityId,
          },
        },
        post: {
          connect: {
            id: dto.postId,
          },
        },
      },
    });
  }
}
