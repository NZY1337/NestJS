import { Test, TestingModule } from '@nestjs/testing';
import { ReportsService } from './reports.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { User } from '../users/user.entity';

describe('ReportsService', () => {
    let service: ReportsService;
    let repo: any;

    beforeEach(async () => {
        repo = {
            findOne: jest.fn(),
            save: jest.fn(),
        };
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ReportsService,
                {
                    provide: getRepositoryToken(Report),
                    useValue: repo,
                },
            ],
        }).compile();

        service = module.get<ReportsService>(ReportsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should add user to likedBy if not already liked', async () => {
        const user: User = { id: 1 } as User;
        const report: Report = { id: 2, likedBy: [] } as any;
        repo.findOne.mockResolvedValue(report);
        repo.save.mockResolvedValue({ ...report, likedBy: [user] });

        const result = await service.likeReport(2, user);
        expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 2 }, relations: { likedBy: true } });
        expect(report.likedBy).toContain(user);
        expect(repo.save).toHaveBeenCalledWith(report);
        expect(result).toEqual([user]);
    });

    it('should remove user from likedBy if already liked', async () => {
        const user: User = { id: 1 } as User;
        const report: Report = { id: 2, likedBy: [user] } as any;
        repo.findOne.mockResolvedValue(report);
        repo.save.mockResolvedValue({ ...report, likedBy: [] });

        const result = await service.likeReport(2, user);
        expect(report.likedBy).not.toContain(user);
        expect(repo.save).toHaveBeenCalledWith(report);
        expect(result).toEqual([]);
    });
});
