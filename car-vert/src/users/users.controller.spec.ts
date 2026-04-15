import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.services';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
    let controller: UsersController;
    let fakeUsersService: Partial<UsersService> = {};
    let fakeAuthService: Partial<AuthService> = {};

    beforeEach(async () => {
        fakeUsersService = {
            findOne: (id: number) => {
                return Promise.resolve({ id, email: 'asdf@gmail.com', password: 'asdf' } as User);
            },
            find: (email: string) => {
                return Promise.resolve([{ id: 1, email, password: 'asdf' } as User]);
            },
            // create: () => { },
            // update: () => { },
            // remove: () => { },
        };
        fakeAuthService = {
            // signup: () => { },
            signin: (email: string, password: string) => {
                return Promise.resolve({ id: 1, email, password } as User);
            },
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                { provide: UsersService, useValue: fakeUsersService },
                { provide: AuthService, useValue: fakeAuthService },
            ],
        }).compile();

        controller = module.get<UsersController>(UsersController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('findUser returns a user with the given id', async () => {
        const user = await controller.findUser('1');
        expect(user).toBeDefined();
        expect(user.id).toEqual(1);
    });

    it('findUser throws an error if user with given id is not found', async () => {
        fakeUsersService.findOne = () => null;
        await expect(controller.findUser('2')).rejects.toThrow(NotFoundException);
    });

    it('signin updates session object and returns user', async () => {
        const session = { userId: -110 };
        const user = await controller.signIn({ email: 'asd@yahoo.com', password: 'asdf' }, session);
        expect(user).toBeDefined();
        expect(user.id).toEqual(1);
        expect(session.userId).toEqual(1);
    });
});
