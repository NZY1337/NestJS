import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
    ManyToMany,
    JoinTable,
} from "typeorm";
import { User } from "../users/user.entity";
import { Comment } from "../comments/comment.entity";

@Entity()
export class Report {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: false })
    approved: boolean;

    @Column()
    price: number;

    @Column()
    make: string;

    @Column()
    model: string;

    @Column()
    year: number;

    @Column()
    lng: number;

    @Column()
    lat: number;

    @Column()
    mileage: number;

    // user can have many reports, but each report can only be made by one user
    @ManyToOne(() => User, (user) => user.reports)
    user: User;

    // one report can have MANY comments
    @OneToMany(() => Comment, (comment) => comment.report)
    comments: Comment[];

    @ManyToMany(() => User)
    @JoinTable()
    likedBy: User[];
}