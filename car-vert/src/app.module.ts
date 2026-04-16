import { Module, ValidationPipe, MiddlewareConsumer } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportsModule } from './reports/reports.module';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommentsModule } from './comments/comments.module';
import { Comment } from './comments/comment.entity';

const cookieSession = require('cookie-session');

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.env.${process.env.NODE_ENV}`,
        }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return {
                    type: 'sqlite',
                    database: configService.get<string>('DB_NAME'),
                    entities: [User, Report, Comment],
                    synchronize: true,
                }
            }
        }),
        ReportsModule, UsersModule, CommentsModule],
    controllers: [AppController],
    providers: [AppService, {
        provide: APP_PIPE,
        useValue: new ValidationPipe({
            whitelist: true,
        }),
    }],
})

export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        // this will be shared down to all modules
        consumer.apply(cookieSession({
            keys: ['asdfasdfsadf'],
            maxAge: 1 * 60 * 60 * 1000 // 1h
        })).forRoutes('*');
    }
}

