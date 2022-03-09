import { Module } from '@nestjs/common';
import {ConfigModule } from '@nestjs/config'

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { ReactionModule } from './reaction/reaction.module';
import { CommentModule } from './comment/comment.module';
import { PrismaModule } from './prisma/prisma.module';
import { MailModule } from './helpers/mail/mail.module';


@Module({
  imports: [
    AuthModule,
    UserModule,
    PostModule,
    ReactionModule,
    CommentModule,
    PrismaModule,
    MailModule,
    ConfigModule.forRoot({isGlobal:true}),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
