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
import { Profile } from '@prisma/client';
import { GetProfile } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { ReactionDto, RemoveReactionDto } from './dto';
import { ReactionService } from './reaction.service';

@Controller('api/reaction')
@UseGuards(JwtGuard)
export class ReactionController {
  constructor(private reactionService: ReactionService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('toggle-comment-reaction')
  toggleCommentReaction(@GetProfile() profile: Profile, @Body() dto: ReactionDto) {
    this.reactionService.toggleCommentReaction(profile, dto)
    return 'addCommentReaction with id ' + dto.entityId;
  }

  @Get('/:id')
  getMyCommentReaction(@GetProfile() profile: Profile, @Param('id') id: number) {
    return this.reactionService.getMyCommentReaction(profile, id);
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Post('toggle-post-reaction')
  togglePostReaction(@GetProfile() profile: Profile, @Body() dto: ReactionDto) {
    this.reactionService.togglePostReaction(profile, dto)
    return 'togglePostReaction with id ' + dto.entityId;
  }

  @Get('/:id')
  getMyPostReaction(@GetProfile() profile: Profile, @Param('id') id: number) {
    return this.reactionService.getMyPostReaction(profile, id);
  }
}
