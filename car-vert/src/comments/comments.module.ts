import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { ReportsModule } from '../reports/reports.module';

@Module({
    imports: [TypeOrmModule.forFeature([Comment]), ReportsModule],
    controllers: [CommentsController],
    providers: [CommentsService],
})

export class CommentsModule { }
