import { Injectable } from '@nestjs/common';
import { Profile, Reaction, ReactionKind, ReactionType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReactionDto } from './dto';

@Injectable()
export class ReactionService {
  constructor(private prisma: PrismaService) {}

  async togglePostReaction(profile: Profile, dto: ReactionDto) {
    const reaction = await this.prisma.reaction.findFirst({
      where: {
        profileId: profile.id,
        postId: dto.entityId,
        kind: ReactionKind.POST_REACTION,
      },
    });

    if (!reaction) {
      return await this.addPostReaction(
        profile.id,
        ReactionKind.POST_REACTION,
        dto.entityId,
        dto.reactionType,
      );
    } else if (reaction.type === dto.reactionType) {
      return await this.removeReaction(reaction.id);
    } else {
      return await this.toggleReaction(reaction.id, dto.reactionType);
    }
  }

  async getMyCommentReaction(profile: Profile, id: number) {
    const reaction = await this.prisma.reaction.findFirst({
      where: {
        AND: [
          {
            commentId: id,
          },
          {
            profileId: profile.id,
          },
        ],
      },
    });

    if (!reaction) return null;

    return reaction.type;
  }

  async toggleCommentReaction(profile: Profile, dto: ReactionDto) {
    const reaction = await this.prisma.reaction.findFirst({
      where: {
        profileId: profile.id,
        commentId: dto.entityId,
        kind: ReactionKind.POST_REACTION,
        type: dto.reactionType,
      },
    });

    if (!reaction) {
      return await this.addCommentReaction(
        profile.id,
        ReactionKind.POST_REACTION,
        dto.entityId,
        dto.reactionType,
      );
    } else if (reaction.type === dto.reactionType) {
      return await this.removeReaction(reaction.id);
    } else {
      return await this.toggleReaction(reaction.id, dto.reactionType);
    }
  }

  async getMyPostReaction(profile: Profile, id: number) {
    const reaction = await this.prisma.reaction.findFirst({
      where: {
        AND: [
          {
            postId: id,
          },
          {
            profileId: profile.id,
          },
        ],
      },
    });

    if (!reaction) return null;

    return reaction.type;
  }

  async addPostReaction(
    profileId: number,
    kind: ReactionKind,
    entityId: number,
    reactionType: ReactionType,
  ) {
    const reaction = await this.prisma.reaction.create({
      data: {
        kind: kind,
        type: reactionType,
        post: {
          connect: {
            id: entityId,
          },
        },
        profile: {
          connect: {
            id: profileId,
          },
        },
      },
    });
    return this.dumpToDto(reaction, false);
  }

  async addCommentReaction(
    profileId: number,
    kind: ReactionKind,
    entityId: number,
    reactionType: ReactionType,
  ) {
    const reaction = await this.prisma.reaction.create({
      data: {
        kind: kind,
        type: reactionType,
        comment: {
          connect: {
            id: entityId,
          },
        },
        profile: {
          connect: {
            id: profileId,
          },
        },
      },
    });
    return this.dumpToDto(reaction, false);
  }

  async removeReaction(id: number) {
    const reaction = await this.prisma.reaction.delete({
      where: {
        id: id,
      },
    });
    return this.dumpToDto(reaction, false);
  }

  async toggleReaction(id: number, type: ReactionType) {
    const reaction = await this.prisma.reaction.update({
      where: {
        id: id,
      },
      data: {
        type: type,
      },
    });

    return this.dumpToDto(reaction, true);
  }

  dumpToDto(reaction: Reaction, update: boolean) {
    return {
      reactionType: reaction.type,
      update: update,
    };
  }
}
