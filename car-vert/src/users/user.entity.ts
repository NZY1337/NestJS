import {
    AfterInsert, AfterRemove, AfterUpdate, Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    ManyToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Report } from '../reports/report.entity';
import { Comment } from '../comments/comment.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column({ default: true })
    admin: boolean;

    // one user can have MANY reports
    @OneToMany(() => Report, (report) => report.user)
    reports: Report[];

    @OneToMany(() => Comment, (comment) => comment.user)
    comments: Comment[];

    @AfterInsert()
    logInsert() {
        console.log('Inserted user with id', this.id);
    }

    @AfterUpdate()
    logUpdate() {
        console.log('Updated user with id', this.id);
    }

    @AfterRemove()
    logRemove() {
        console.log('Removed user with id', this.id);
    }
}
