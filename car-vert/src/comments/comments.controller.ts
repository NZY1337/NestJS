import { Controller, Post, Body, Param, Get, Delete } from '@nestjs/common';
import { ReportsService } from '../reports/reports.service';
import { Serialize } from '../interceptors/serialize.interceptors';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentDto } from './dto/comment.dto';
import { CommentsService } from './comments.service';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';

@Serialize(CommentDto)
@UseGuards(AuthGuard)
@Controller('comments')
export class CommentsController {
    constructor(private commentService: CommentsService) { }

    @Post('/:id')
    createComment(
        @Body() body: CreateCommentDto,
        @Param('id') id: string,
        @CurrentUser() user: User
    ) {
        return this.commentService.create(body, parseInt(id), user);
    }

    @Get('/:id')
    getComments(@Param('id') id: string) {
        return this.commentService.getComments(parseInt(id));
    }

    @Get('/:reportId/:commentId')
    getComment(
        @Param('reportId') reportId: string,
        @Param('commentId') commentId: string,
    ) {
        return this.commentService.getComment(parseInt(reportId), parseInt(commentId));
    }

    @Delete('/:reportId/:commentId')
    deleteComment(@Param('reportId') reportId: string,
        @Param('commentId') commentId: string,
        @CurrentUser() user: User) {
        return this.commentService.deleteComment(parseInt(reportId), parseInt(commentId), user)
    }
}
