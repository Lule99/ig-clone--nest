import { Controller, Get, Post } from '@nestjs/common';
import { PostService } from 'src/post/post.service';
import { CommentService } from './comment.service';

@Controller('api/comment')
export class CommentController {
    constructor(
        private commentService : CommentService,
        private postService : PostService
        ){}

    @Get()
    getCommentsForPost(){
        return 'getCommentsForPost'
    }

    @Get('/comment')
    getCommentsForComment(){
        return 'getCommentsForComment'
    }

    @Get('/get-one/:id')
    getOneComment(){
        return 'getOneComment'
    }

    @Post('publish-on-post')
    publishCommentOnPost(){
        return 'publishCommentOnPost'
    }

    @Post('publish-on-comment')
    publishCommentOnComment(){
        return 'publishCommentOnComment'
    }

}
