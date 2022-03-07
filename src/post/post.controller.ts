import { Controller, Delete, Get, HttpCode, Post, Put } from '@nestjs/common';
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
    @HttpCode(202)
    deletePost(){
        return 'deletePost'
    }

    @Post('')
    @HttpCode(201)
    publishPost(){
        return 'publishPost'
    }
    
    @Put('')
    @HttpCode(201)
    updatePost(){
        return 'updatePost'
    }


}
