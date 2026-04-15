import { Test, TestingModule } from '@nestjs/testing';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';

describe('ReportsController', () => {
    let controller: ReportsController;
    let reportsService: any;

    beforeEach(async () => {
        reportsService = { create: jest.fn(), getReport: jest.fn(), getAllReports: jest.fn(), changeApproval: jest.fn(), likeReport: jest.fn(), getLikes: jest.fn() };
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ReportsController],
            providers: [
                { provide: ReportsService, useValue: reportsService },
            ],
        }).compile();

        controller = module.get<ReportsController>(ReportsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
