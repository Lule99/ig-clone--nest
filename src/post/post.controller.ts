import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Profile, User } from '@prisma/client';
import { GetProfile } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { NewPostDto } from './dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './post.service';

@Controller('api/post')
@UseGuards(JwtGuard)
export class PostController {
  constructor(private postService: PostService) {}

  @Get('feed')
  getFeed(
    @GetProfile() profile: Profile,
    @Query('page') page: number,
    @Query('size') size: number) {
    
    return this.postService.getFeed(profile, page, size);
  }

  @Get('user-posts')
  getUserPosts(
    @Query('username') username: string,
    @Query('page') page: number,
    @Query('size') size: number,
  ) {
    return this.postService.getUserPosts(username, page, size);
  }

  @Get('/:id')
  getOnePost(@Param('id') id: number) {
    return this.postService.getOnePost(id);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  deletePost(@GetProfile() profile: Profile, @Param('id') id: number) {
    return this.postService.deletePost(profile, id);
  }

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  publishPost(@GetProfile() profile: Profile, @Body() dto: NewPostDto) {
    return this.postService.publishPost(profile, dto);
  }

  @Put('')
  @HttpCode(HttpStatus.ACCEPTED)
  updatePost(@GetProfile() profile: Profile, @Body() dto: UpdatePostDto) {
    return this.postService.updatePost(profile, dto);
  }
}
