import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { ReportsService } from '../reports/reports.service';

@Injectable()
export class CommentsService {
    constructor(@InjectRepository(Comment) private commentRepo: Repository<Comment>,
        private reportRepo: ReportsService) { }

    async create(bodyDto: CreateCommentDto, id: string) {
        const report = await this.reportRepo.getReport(id);
        const newComment = this.commentRepo.create(bodyDto);

        newComment.report = report;
        return this.commentRepo.save(newComment);
    }

    async getComments(id: string): Promise<Comment[]> {
        const report = await this.reportRepo.getReport(id);
        return this.commentRepo.find({ where: { report: { id: report.id } }, relations: { report: true } });
    }
}
