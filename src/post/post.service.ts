import { BadRequestException, Injectable } from '@nestjs/common';
import { Post, Profile, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { NewPostDto, UpdatePostDto } from './dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async updatePost(profile: Profile, dto: UpdatePostDto) {
    try {
      await this.prisma.profile.update({
        where: {
          id: profile.id,
        },
        data: {
          posts: {
            update: {
              where: {
                id: dto.postToUpdateId,
              },
              data: {
                text: dto.message,
                picture: dto.picture,
              },
            },
          },
        },
      });
    } catch (err) {
      throw new BadRequestException('No post with this id');
    }
  }

  async publishPost(profile: Profile, dto: NewPostDto) {
    return await this.prisma.post.create({
        data:{
          text: dto.message,
          picture: dto.picture,
          publisher: {
            connect: {
              id: profile.id
            }
          }
        }
    })

  }
  async deletePost(profile: Profile, id: number) {
    
    try{
    await this.prisma.profile.update({
      where: {
        id: profile.id,
      },
      data: {
        posts: {
          update: {
            where: {
              id: id,
            },
            data: {
              active: false,
            },
          },
        },
      },
    });
  }catch(err){
    throw new BadRequestException('No post with this id');
  }

  }

  async getOnePost(id: number) {
    id = Number(id)
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
    page = Number(page)
    size = Number(size)

    console.log(page+" "+size)

    const profile: Profile = await this.getProfileFromUsername(username);
    return this.getPostsFromPublishers([profile], page, size);
  }

  async getFeed(profile: Profile, page: number, size: number) {
    page = Number(page);
    size = Number(size);

    const publishers: Profile[] = await this.prisma.profile
      .findFirst({
        where: {
          id: profile.id,
        },
      })
      .following();
    publishers.push(profile);

    return await this.getPostsFromPublishers(publishers, page, size);
  }

  async getPostsFromPublishers(
    publishers: Profile[],
    page: number,
    size: number,
  ): Promise<Post[]> {
    return await this.prisma.post.findMany({
      skip: page * size,
      take: size,
      where: {
        active: true,
        publisherId: {
          in: publishers.map((p) => p.id),
        },
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
}
