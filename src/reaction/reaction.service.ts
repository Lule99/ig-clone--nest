import { Injectable } from '@nestjs/common';
import { Profile } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReactionDto } from './dto';

@Injectable()
export class ReactionService {
  constructor(private prisma: PrismaService) {}

  async toggleCommentReaction(profile: Profile, dto: ReactionDto) {
    throw new Error('Method not implemented.');
  }
  async getMyCommentReaction(profile: Profile, id: number) {
    const reaction = await this.prisma.reaction.findFirst({
      where: {
        AND: [
          {
            commentId: id
          },
          {
            profileId: profile.id
          },
        ],
      },
    });

    if(!reaction)
      return null

    return reaction.type;
  }

  async togglePostReaction(profile: Profile, dto: ReactionDto) {
    throw new Error('Method not implemented.');
  }
  
  async getMyPostReaction(profile: Profile, id: number) {
    const reaction = await this.prisma.reaction.findFirst({
      where: {
        AND: [
          {
            postId: id
          },
          {
            profileId: profile.id
          },
        ],
      },
    });

    if(!reaction)
      return null

    return reaction.type;
  }
}
