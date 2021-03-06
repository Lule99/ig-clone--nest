import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Profile } from '@prisma/client';
import { NewCommentDto } from 'src/comment/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { NewPostDto, UpdatePostDto } from './dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async updatePost(profile: Profile, dto: UpdatePostDto) {
    if (!(await this.profileIsOwner(profile, dto.postToUpdateId)))
      throw new ForbiddenException(
        `User ${profile.name} is not the owner of the post!`,
      );

    try {
      await this.prisma.post.update({
        where: {
          id: dto.postToUpdateId,
        },
        data: {
          text: dto.text,
          picture: dto.picture,
        },
      });
    } catch (err) {
      throw new BadRequestException('No post with this id');
    }
  }

  async publishPost(profile: Profile, dto: NewPostDto) {
    return await this.prisma.post.create({
      data: {
        text: dto.text,
        picture: dto.picture,
        publisher: {
          connect: {
            id: profile.id,
          },
        },
      },
    });
  }

  async deletePost(profile: Profile, id: number) {
    try {
      await this.prisma.post.update({
       where:{
         id:id
       },
       data:{
         active:false
       }
      });
    } catch (err) {
      throw new BadRequestException('No post with this id');
    }
  }

  async getOnePost(id: number) {
    const post = await this.prisma.post.findFirst({
      where: {
        AND: [
          {
            id: id,
          },
          {
            active: true,
          },
        ],
      },
    });

    const dto = {
      id: post.id,
      picture: post.picture,
      text: post.text,
    };

    return dto;
  }

  async getUserPosts(username: string, page: number, size: number) {
    const profile: Profile = await this.getProfileFromUsername(username);
    return this.getPostsFromPublishers([profile], page, size);
  }

  async getFeed(profile: Profile, page: number, size: number) {
    const publishers: Profile[] = await this.prisma.profile
      .findFirst({
        where: {
          id: profile.id,
        },
      })
      .following();
    publishers.push(profile);

    const rawPosts = await this.getPostsFromPublishers(publishers, page, size);
    return rawPosts.map((p) => {
      return {
        id: p.id,
        userProfilePicture: p.publisher.profilePicture,
        text: p.text,
        picture: p.picture,
        username: p.publisher.user.username,
        numOfReactions: p.reactions.length,
        dateTime: p.createdAt,
      };
    });
  }

  async getPostsFromPublishers(
    publishers: Profile[],
    page: number,
    size: number,
  ) {
    return await this.prisma.post.findMany({
      skip: page * size,
      take: size,
      where: {
        active: true,
        publisherId: {
          in: publishers.map((p) => p.id),
        },
      },
      include: {
        publisher: {
          include: {
            user: true,
          },
        },
        reactions: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getProfileFromUsername(username: string): Promise<Profile> {
    const profile = await this.prisma.user
      .findFirst({
        where: {
          username: username,
        },
      })
      .profile();

    if (!profile) throw new BadRequestException('No profile found');

    return profile;
  }

  async publishComment(profile: Profile, dto: NewCommentDto) {
    if (!this.profileAllowedToSee(profile, dto.commentedEntityId))
      throw new ForbiddenException(
        'Not allowed to publish! You dont follow this.',
      );

    return await this.prisma.comment.create({
      data: {
        commentText: dto.text,
        post: {
          connect: {
            id: dto.commentedEntityId,
          },
        },
        profile: {
          connect: {
            id: profile.id,
          },
        },
      },
    });
  }

  async profileAllowedToSee(profile: Profile, id: number) {
    const followingList: Profile[] = await this.prisma.profile
      .findFirst({
        where: {
          id: profile.id,
        },
      })
      .following();

    return !!(await this.prisma.post.findFirst({
      where: {
        AND: [
          {
            id: id,
          },
          {
            publisherId: {
              in: followingList.map((p) => p.id),
            },
          },
        ],
      },
    }));
  }

  async profileIsOwner(profile: Profile, id: number) {
    const post = await this.prisma.post.findFirst({
      where: {
        id: id,
      },
    });

    return post ? profile.id === post.publisherId : false;
  }
}
