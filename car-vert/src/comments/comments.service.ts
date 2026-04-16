import { BadRequestException, Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { ReportsService } from '../reports/reports.service';
import { User } from '../users/user.entity';

@Injectable()
export class CommentsService {
    constructor(@InjectRepository(Comment) private commentRepo: Repository<Comment>,
        private reportRepo: ReportsService) { }

    async create(bodyDto: CreateCommentDto, id: number, user: User) {
        const report = await this.reportRepo.getReport(id);
        const newComment = this.commentRepo.create(bodyDto);

        newComment.report = report;
        newComment.user = user;

        return this.commentRepo.save(newComment);
    }

    async getComments(id: number): Promise<Comment[]> {
        const report = await this.reportRepo.getReport(id);
        return this.commentRepo.find({
            where: {
                report: {
                    id: report.id
                }
            },
            relations: {
                report: {
                    user: true
                },
                user: true
            }
        });
    }

    async getComment(reportId: number, commentId: number) {
        const comment = await this.commentRepo.findOne({
            where: {
                id: commentId,
                report: { id: reportId }
            },
            relations: {
                report: {
                    user: true
                },
                user: true
            }
        });

        if (!comment) throw new NotFoundException('Comment not found');

        return comment;
    }

    // in this fn I would not get the return message because in controller
    // i have the Serialize(commentdto) that returns another kind of message 
    // i need to have someting custom like Serialize(DeleteCommentDto)
    async deleteComment(reportId: number, commentId: number, user: User) {
        const comment = await this.getComment(reportId, commentId);
        if (!comment) throw new NotFoundException('Comment not found');

        if (comment.user.id !== user.id) {
            throw new ForbiddenException('You do not have permission to delete this comment');
        }

        await this.commentRepo.remove(comment);
        return { message: 'Comment deleted successfully' };

    }
}
