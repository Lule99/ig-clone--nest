import { BadRequestException, Injectable } from '@nestjs/common';
import { Profile, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProfileInfoDto, UpdateUserDto } from './dto';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async followCheck(follower: string, followedUsername: string) {
    const followerProfile = await this.prisma.user
      .findFirst({
        where: {
          username: follower,
        },
      })
      .profile();

    if (!followerProfile) throw new BadRequestException('Profile not found');

    return this.checkIfFollows(followerProfile, followedUsername);
  }

  async unfollow(profile: Profile, otherUsername: string) {
    const unfollowed = await this.prisma.user
      .findFirst({
        where: {
          username: otherUsername,
        },
      })
      .profile();

    const update = await this.prisma.profile.update({
      where: {
        id: profile.id,
      },
      data: {
        following: {
          disconnect: {
            id: unfollowed.id,
          },
        },
      },
    });
  }

  async follow(profile: Profile, followedUsername: string) {

    if (await this.checkIfFollows(profile, followedUsername))
      throw new BadRequestException('User already follows');

    const followed = await this.prisma.user
      .findFirst({
        where: {
          username: followedUsername,
        },
      })
      .profile();

    const update = await this.prisma.profile.update({
      where: {
        id: profile.id,
      },
      data: {
        following: {
          connect: {
            id: followed.id,
          },
        },
      },
    });
  }

  async getProfileInfo(username: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        username: username,
      },
      include: {
        profile: {
          include: {
            posts: true,
            followedBy: true,
            following: true,
          },
        },
      },
    });

    const dto: ProfileInfoDto = {
      username: username,
      postsNumber: user.profile.posts.length,
      followersNumber: user.profile.followedBy.length,
      followingNumber: user.profile.following.length,
      name: user.profile.name,
      picture: user.profile.profilePicture,
      bio: user.profile.bio,
    };

    return dto;
  }

  async search(query: string) {
    const users = await this.prisma.user.findMany({
      where: {
        username: {
          contains: query,
          mode: 'insensitive',
        },
      },
      include: {
        profile: true,
      },
    });

    if (!users) return [];

    return users.map((u) => ({
      username: u.username,
      picture: u.profile.profilePicture,
      name: u.profile.name,
    }));
  }

  async updateUser(user: User, dto: UpdateUserDto) {
    await this.prisma.user.update({
      where: {
        username: user.username,
      },
      data: {
        username: dto.username,
        profile: {
          update: {
            name: dto.name,
            bio: dto.bio,
            profilePicture: dto.picture,
          },
        },
      },
    });
  }

  async checkIfFollows(profile: Profile, followedUsername: string) {
    
    const followedProfile = await this.prisma.user.findFirst({
      where:{
        AND:[{
          username:followedUsername
        },{
          profile:{
            followedBy:{
              some:{
                id:profile.id
              }
            }
          }
        }]
      }
    })

    return !!followedProfile;
  }

  async getProfileByUsername(username: string): Promise<Profile> {
    const profile: Profile = await this.prisma.user
      .findFirst({
        where: {
          username: username,
        },
      })
      .profile();

    if (!profile) throw new BadRequestException('Profile not found');
    return profile;
  }
}
