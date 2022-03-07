import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { ReactionDto, RemoveReactionDto } from './dto';
import { ReactionService } from './reaction.service';

@Controller('api/reaction')
@UseGuards(JwtGuard)
export class ReactionController {
  constructor(private reactionService: ReactionService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('add-comment-reaction')
  addCommentReaction(@GetUser() user: User, @Body() dto: ReactionDto) {
    return 'addCommentReaction with id ' + dto.entityId;
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Delete('remove-comment-reaction')
  removeCommentReaction(@GetUser() user: User, @Body() dto: RemoveReactionDto) {
    return 'removeCommentReaction with id ' + dto.id;
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Post('toggle-post-reaction')
  togglePostReaction(@GetUser() user: User, @Body() dto: ReactionDto) {
    return 'togglePostReaction with id ' + dto.entityId;
  }

  @Get('/:id')
  myPostReaction(@GetUser() user: User, @Param('id') id: number) {
    return 'myPostReaction user: ' + user.username;
  }
}
