import { Module } from '@nestjs/common';
import { PostModule } from 'src/post/post.module';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

@Module({
  controllers: [CommentController],
  providers: [CommentService],
  exports:[CommentService],
  imports: [PostModule],
})
export class CommentModule {}
