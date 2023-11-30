import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';
import { BooksServiceModule } from './modules/books/books.module';
import { RxjsModule } from './modules/rxjs/rxjs.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CommentsModule } from './modules/book-comments/comments.module';

@Module({
  imports: [
    BooksServiceModule, 
    AuthModule,
    UsersModule,
    RxjsModule,
    CommentsModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION),
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
