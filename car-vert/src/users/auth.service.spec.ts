import { Test } from "@nestjs/testing";
import { AuthService } from "./auth.services";
import { UsersService } from "./users.service";
import { User } from "./user.entity";
import { BadRequestException } from "@nestjs/common";

describe('AuthService', () => {
    let service: AuthService;
    let fakeUsersService: Partial<UsersService>;

    beforeEach(async () => {
        const users: User[] = [];
        fakeUsersService = {
            find: (email: string) => {
                const filteredUsers = users.filter(user => user.email === email);
                return Promise.resolve(filteredUsers);
            },
            create: (email: string, password: string) => {
                const user = ({ id: Math.floor(Math.random() * 999999), email, password } as User);

                users.push(user);
                return Promise.resolve(user);
            }
        };

        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: fakeUsersService
                }
            ]
        }).compile();

        service = module.get(AuthService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create a new user with salted and hashed password', async () => {
        const user = await service.signup('asdf@yahoo.com', 'asdf');
        expect(user.password).not.toEqual('asdf');
        const [salt, hash] = user.password.split('.');
        expect(salt).toBeDefined();
        expect(hash).toBeDefined();
    });

    it("throws an error if email is in use", async () => {
        await service.signup('a@a.com', 'asdf');
        await expect(service.signup('a@a.com', 'asdf')).rejects.toThrow(BadRequestException);
    });

    it("throws if signin is called with an unused email", async () => {
        await expect(service.signin('asd@yahoo.com', 'test')).rejects.toThrow();
    });

    it('throws if an invalid password is provided', async () => {
        await service.signup('asdf@asdf.com', 'correctpassword');
        await expect(service.signin('asdf@asdf.com', 'wrongpassword')).rejects.toThrow(BadRequestException);
    });

    it('returns a user if correct password is provided', async () => {
        await service.signup('asdf@asdf.com', 'correctpassword');
        const user = await service.signin('asdf@asdf.com', 'correctpassword');
        console.log(user);
    });
})