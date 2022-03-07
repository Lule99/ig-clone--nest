import { Controller, Delete, Get, Post } from '@nestjs/common';
import { ReactionService } from './reaction.service';

@Controller('api/reaction')
export class ReactionController {

    constructor(
        private reactionService : ReactionService
    ){}

    @Post('add-comment-reaction')
    addCommentReaction(){
        return 'addCommentReaction'
    }

    @Delete('remove-comment-reaction')
    removeCommentReaction(){
        return 'removeCommentReaction'
    }

    @Post('toggle-post-reaction')
    togglePostReaction(){
        return 'togglePostReaction'
    }

    @Get('/:id')
    myPostReaction(){
        return 'myPostReaction'
    }
}
