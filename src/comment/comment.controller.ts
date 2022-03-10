import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Profile } from '@prisma/client';
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
    @Query('postId', ParseIntPipe) postId: number,
    @Query('page', ParseIntPipe) page: number,
    @Query('size', ParseIntPipe) size: number,
  ) {
    return this.commentService.getAllForPost(postId, page, size);
  }

  @Get('/comment')
  getCommentsForComment(
    @Query('commentId', ParseIntPipe) commentId: number,
    @Query('page', ParseIntPipe) page: number,
    @Query('size', ParseIntPipe) size: number,
  ) {
    return this.commentService.getAllForComment(commentId, page, size);
  }

  @Get('/get-one/:id')
  getOneComment(@Param('id', ParseIntPipe) id: number) {
    return this.commentService.getOne(id);
  }

  @Post('publish-on-post')
  publishCommentOnPost(
    @GetProfile() profile: Profile,
    @Body() dto: NewCommentDto,
  ) {
    return this.postService.publishComment(profile, dto);
  }

  @Post('publish-on-comment')
  publishCommentOnComment(
    @GetProfile() profile: Profile,
    @Body() dto: NewCommentDto,
  ) {
    return this.commentService.publish(profile, dto);
  }
}
