import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
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
    @Query('postId') postId: number,
    @Query('page') page: number,
    @Query('size') size: number,
  ) {
    return 'getCommentsForPost with id: ' + postId;
  }

  @Get('/comment')
  getCommentsForComment(
    @Query('commentId') commentId: number,
    @Query('page') page: number,
    @Query('size') size: number,
  ) {
    return 'getCommentsForComment with id: ' + commentId;
  }

  @Get('/get-one/:id')
  getOneComment(@Param('id') id: number) {
    return 'getOneComment with id: ' + id;
  }

  @Post('publish-on-post')
  publishCommentOnPost(@GetProfile() user: User, @Body() dto: NewCommentDto) {
    return 'publishCommentOnPost:\ntext: ' + dto.text;
  }

  @Post('publish-on-comment')
  publishCommentOnComment(@GetProfile() user: User, @Body() dto: NewCommentDto) {
    return 'publishCommentOnComment:\ntext: ' + dto.text;
  }
}
