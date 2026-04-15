import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { ReportsService } from '../reports/reports.service';
import { Serialize } from '../interceptors/serialize.interceptors';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentDto } from './dto/comment.dto';
import { CommentsService } from './comments.service';

@Serialize(CommentDto)
@UseGuards(AuthGuard)
@Controller('comments')
export class CommentsController {
    constructor(private commentService: CommentsService) { }

    @Post('/:id')
    createComment(@Body() body: CreateCommentDto, @Param('id') id: string) {
        return this.commentService.create(body, id);
    }

    @Get('/:id')
    getComments(@Param('id') id: string) {
        return this.commentService.getComments(id);
    }
}
