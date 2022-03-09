import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Profile, User } from '@prisma/client';
import { GetProfile } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { PostService } from 'src/post/post.service';
import { CommentService } from './comment.service';
import { NewCommentDto } from './dto';

@Controller('api/comment')
@UseGuards(JwtGuard)
export class CommentController {
  constructor(
    private commentService: CommentService,
    private postService: PostService,
  ) {}

  @Get()
  getCommentsForPost(
    @GetProfile() profile: Profile,
    @Query('postId') postId: number,
    @Query('page') page: number,
    @Query('size') size: number,
  ) {
    return this.commentService.getAllForPost(profile, postId, page, size);
  }

  @Get('/comment')
  getCommentsForComment(
    @GetProfile() profile: Profile,
    @Query('commentId') commentId: number,
    @Query('page') page: number,
    @Query('size') size: number,
  ) {
    return this.commentService.getAllForComment(profile, commentId, page, size);
  }

  @Get('/get-one/:id')
  getOneComment(@GetProfile() profile: Profile, @Param('id') id: number) {
    return this.commentService.getOne(profile,id);
  }

  @Post('publish-on-post')
  publishCommentOnPost(@GetProfile() profile: Profile, @Body() dto: NewCommentDto) {
    return this.postService.publishComment(profile, dto);
  }

  @Post('publish-on-comment')
  publishCommentOnComment(@GetProfile() profile: Profile, @Body() dto: NewCommentDto) {
    return this.commentService.publish(profile, dto);

  }
}
