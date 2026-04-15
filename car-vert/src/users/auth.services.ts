import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

// promisify the scrypt function so that we can use async/await instead of callbacks
const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) { }

    async signup(email: string, passsword: string) {
        const users = await this.usersService.find(email);
        if (users.length) {
            throw new BadRequestException('email in use');
        }

        // generate a salt (generate user password)
        const salt = randomBytes(8).toString('hex');

        // hash the salt and the password togetherusing scrypt
        const hash = (await scrypt(passsword, salt, 32)) as Buffer;

        // join the hashed result and the salt together and save it in the database
        const result = salt + '.' + hash.toString('hex');
        const user = await this.usersService.create(email, result);
        return user;
    }

    async signin(email: string, password: string) {
        const [user] = await this.usersService.find(email);
        if (!user) throw new NotFoundException('user not found');

        const [salt, storedHash] = user.password.split('.');

        const hash = (await scrypt(password, salt, 32)) as Buffer;

        if (hash.toString('hex') !== storedHash) {
            throw new BadRequestException('bad password');
        }

        return user;
    }
}