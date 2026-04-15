import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from './comments.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { ReportsService } from '../reports/reports.service';

describe('CommentsService', () => {
    let service: CommentsService;
    let commentRepo: any;
    let reportsService: any;

    beforeEach(async () => {
        commentRepo = { create: jest.fn(), save: jest.fn(), find: jest.fn() };
        reportsService = { getReport: jest.fn() };
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommentsService,
                { provide: getRepositoryToken(Comment), useValue: commentRepo },
                { provide: ReportsService, useValue: reportsService },
            ],
        }).compile();

        service = module.get<CommentsService>(CommentsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
