import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    // this is the standard syntax for injecting a repository into a service
    constructor(@InjectRepository(User) private repo: Repository<User>) { }

    create(email: string, password: string) {
        // this.repo.create creates an instance of the entity, but does not save it to the database
        // save takes an instance of the entity and saves it to the database

        // first we need to create an instance of the user entity, then we can save it to the database
        const user = this.repo.create({ email, password });

        // without the instance, we cannot validate the data (UserEntity has validation rules)
        return this.repo.save(user);

        // if we call save without create first, 
        // hooks will not be executed and validation will not work
        // but it will save
    }

    // run a query to find a user with a given id, and return the first record that matches
    findOne(id: number) {
        return this.repo.findOneBy({ id });
    }

    // run a query to find all users with a given email, and return an array of records that match
    // if no results are found, it will return an empty array
    find(email: string) {
        return this.repo.find({ where: { email } });
    }

    async update(id: number, attrs: Partial<User>) {
        // first we need to find the user by id, then we can update it
        // in order to update we need an User entity instan
        const user = await this.findOne(id);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        // Object.assign(user, attrs); both are valid, but the spread operator is more concise
        const updatedUser = { ...user, ...attrs };
        return this.repo.save(updatedUser);
    }

    async remove(id: number) {
        // first we need to find the user by id, then we can remove it
        const user = await this.findOne(id);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        this.repo.remove(user);

        // one trip to db, instead of two (find + remove) - without the instance (hooks will not be executed from entity)
        // return this.repo.delete({ id });
    }
}
