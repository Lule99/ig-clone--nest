import { Controller, Delete, Get, HttpCode, HttpStatus, Post, Put } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('api/post')
export class PostController {

    constructor(
        private postService : PostService
    ){}

    @Get('feed')
    getFeed(){
        return 'feed'
    }

    @Get('user-posts')
    getUserPosts(){
        return 'user-posts'
    }

    @Get('/:id')
    getOnePost(){
        return 'onePost'
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.ACCEPTED)
    deletePost(){
        return 'deletePost'
    }

    @Post('')
    @HttpCode(HttpStatus.CREATED)
    publishPost(){
        return 'publishPost'
    }
    
    @Put('')
    @HttpCode(HttpStatus.ACCEPTED)
    updatePost(){
        return 'updatePost'
    }


}
