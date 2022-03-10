import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { ReactionModule } from './reaction/reaction.module';
import { CommentModule } from './comment/comment.module';
import { PrismaModule } from './prisma/prisma.module';
import { MailModule } from './helpers/mail/mail.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import Constants from './helpers/utils/constants';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PostModule,
    ReactionModule,
    CommentModule,
    PrismaModule,
    MailModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(
        __dirname,
        '..',
        Constants.staticContent.mainDir,
        Constants.staticContent.users,
      ),
      serveRoot: Constants.staticContent.userPicturePath,
      exclude: [Constants.staticContent.exclude],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(
        __dirname,
        '..',
        Constants.staticContent.mainDir,
        Constants.staticContent.posts,
      ),
      serveRoot: Constants.staticContent.postPicturePath,
      exclude: [Constants.staticContent.exclude],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
