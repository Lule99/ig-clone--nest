import { Controller, Delete, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ReactionService } from './reaction.service';

@Controller('api/reaction')
export class ReactionController {

    constructor(
        private reactionService : ReactionService
    ){}

    @HttpCode(HttpStatus.CREATED)
    @Post('add-comment-reaction')
    addCommentReaction(){
        return 'addCommentReaction'
    }

    @HttpCode(HttpStatus.ACCEPTED)
    @Delete('remove-comment-reaction')
    removeCommentReaction(){
        return 'removeCommentReaction'
    }

    @HttpCode(HttpStatus.ACCEPTED)
    @Post('toggle-post-reaction')
    togglePostReaction(){
        return 'togglePostReaction'
    }

    @Get('/:id')
    myPostReaction(){
        return 'myPostReaction'
    }
}
