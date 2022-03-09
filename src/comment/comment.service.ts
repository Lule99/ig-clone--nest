import { Injectable } from '@nestjs/common';
import { Profile, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { NewCommentDto } from './dto';

@Injectable()
export class CommentService {

    constructor(private prisma: PrismaService) {}
  async getAllForPost(profile: Profile, postId: number, page: number, size: number) {
    page = Number(page);
    size = Number(size);
    return await this.prisma.comment.findMany({
        take:size,
        skip:page*size,
        where:{
            active:true,
            postId: postId
        }
    })
  }

  async getAllForComment(profile: Profile, commentId: number, page: number, size: number) {
    page = Number(page);
    size = Number(size);
    return await this.prisma.comment.findMany({
        take:size,
        skip:page*size,
        where:{
            active:true,
            parentCommentId: commentId
        }
    })  }

  async getOne(profile: Profile, id: number) {
    return await this.prisma.comment.findMany({
        where:{
            active:true,
            id:id
        }
    })
  }

  async publish(profile: Profile, dto: NewCommentDto) {
    return await this.prisma.comment.create({
        data:{
            commentText: dto.text,
            profile: {
                connect:{
                    id: profile.id
                }
            },
            parentComment: {
                connect: {
                    id: dto.commentedEntityId
                }
            },
            post: {
                connect:{
                    //TODO --> napravi novi dto i prosledi post na koji se odnosi!!!
                    id: 1
                }
            }
        }
    })
  }
}
