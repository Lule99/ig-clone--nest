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
    page: number,
    size: number,
  ) {
    this.postService.getUserPosts(username, page, size);
    return 'user-posts for user ' + username;
  }

  @Get('/:id')
  getOnePost(@Param('id') id: number) {
    this.postService.getOnePost(id);
    return 'onePost with id' + id;
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  deletePost(@Param('id') id: number) {
    this.postService.deletePost(id);
    return 'deletePost with id ' + id;
  }

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  publishPost(@GetProfile() profile: Profile, @Body() dto: NewPostDto) {
    this.postService.publishPost(profile, dto);
    return 'publishPost with text' + dto.message;
  }

  @Put('')
  @HttpCode(HttpStatus.ACCEPTED)
  updatePost(@GetProfile() profile: Profile, @Body() dto: UpdatePostDto) {
    this.postService.updatePost(profile, dto);
    return 'updatePost with id' + dto.postToUpdateId;
  }
}
