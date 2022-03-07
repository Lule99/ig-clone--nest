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
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
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
      @GetUser() user: User,
      page: number, 
      size: number
      ) {
    return 'feedForUser|' + user.username;
  }

  @Get('user-posts')
  getUserPosts(
    @Query('username') username: string,
    page: number,
    size: number
    ) {
    return 'user-posts for user '+username;
  }

  @Get('/:id')
  getOnePost(@Param('id') id: number) {
    return 'onePost with id'+id;
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  deletePost(@Param('id') id: number) {
    return 'deletePost with id '+id;
  }

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  publishPost(
    @GetUser() user : User,
    @Body() dto : NewPostDto
  ) {
    return 'publishPost with text'+dto.message;
  }

  @Put('')
  @HttpCode(HttpStatus.ACCEPTED)
  updatePost(
    @GetUser() user : User,
    @Body() dto: UpdatePostDto
  ) {
    return 'updatePost with id'+dto.postToUpdateId;
  }
}
