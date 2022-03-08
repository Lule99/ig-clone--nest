import { Injectable } from '@nestjs/common';
import { Post, Profile, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { NewPostDto, UpdatePostDto } from './dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  updatePost(profile: Profile, dto: UpdatePostDto) {
    throw new Error('Method not implemented.');
  }

  publishPost(profile: Profile, dto: NewPostDto) {
    throw new Error('Method not implemented.');
  }

  deletePost(id: number) {
    throw new Error('Method not implemented.');
  }

  getOnePost(id: number) {
    throw new Error('Method not implemented.');
  }

  getUserPosts(username: string, page: number, size: number) {
    throw new Error('Method not implemented.');
  }

  async getFeed(profile: Profile, page: number, size: number) {
    page = Number(page);
    size = Number(size);

    const publishers: Profile[] = await this.prisma.profile.findFirst({
        where: {
            id: profile.id
        },
    }).following()

    const feed: Post[] = await this.prisma.post.findMany({
      skip: page * size,
      take: size,
      where: {
        active: true,
        publisherId: {
            in: publishers.map(p => p.id)
        }
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return feed;
  }

   
  
}
