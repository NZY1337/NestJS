import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { User } from '../users/user.entity';

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private repo: Repository<Report>) { }

    create(reportDto: CreateReportDto, user: User) {
        const report = this.repo.create(reportDto);

        // ASIGN THE USER TO THE REPORT (how we set up ASSSOCIATIONS IN TYPEORM)
        report.user = user;
        return this.repo.save(report);
    }

    async getReport(id: string) {
        const report = await this.repo.findOne({ where: { id: +id }, relations: { user: true } });

        if (!report) {
            throw new NotFoundException('report not found');
        }

        return report;
    }

    async getAllReports(userId: number) {
        return this.repo.find({
            where: { user: { id: userId } },
            relations: { user: true }
        });
    }

    async changeApproval(id: number, approved: boolean) {
        const report = await this.repo.findOne({ where: { id }, relations: { user: true } });

        if (!report) {
            throw new NotFoundException('report not found');
        }

        report.approved = approved;
        return this.repo.save(report);
    }

    async likeReport(id: number, user: User) {
        const report = await this.repo.findOne({ where: { id }, relations: { likedBy: true } });

        if (!report) {
            throw new NotFoundException('report not found');
        }

        const likedByCurrentUser = report.likedBy.map(user => user.id);

        if (likedByCurrentUser.includes(user.id)) {
            report.likedBy = report.likedBy.filter(u => u.id !== user.id);
        } else {
            report.likedBy.push(user);
        }

        await this.repo.save(report);
        return report.likedBy
    }

    async getLikes(id: number) {
        const report = await this.repo.findOne({ where: { id }, relations: { likedBy: true } });

        if (!report) {
            throw new NotFoundException('report not found');
        }

        return report.likedBy.length;
    }
}
