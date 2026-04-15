import { Test, TestingModule } from '@nestjs/testing';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';

describe('CommentsController', () => {
    let controller: CommentsController;
    let commentsService: any;

    beforeEach(async () => {
        commentsService = { create: jest.fn(), getComments: jest.fn() };
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CommentsController],
            providers: [
                { provide: CommentsService, useValue: commentsService },
            ],
        }).compile();

        controller = module.get<CommentsController>(CommentsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
