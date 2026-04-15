import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Report } from "../reports/report.entity";
import { User } from "../users/user.entity";

// I want to have coments on a report, so
// report.comments
// comments will hold the FK to the report
// so its ManyToOne relationship from the comment to the report, 
// and OneToMany from the report to the comment

// OR //

// look at the component - Comment - so this will have multiple entries to the report 
// so Many Comments to One Report, so ManyToOne relationship from the comment to the report,
// and OneToMany from the report to the comment

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @ManyToOne(() => Report, (report) => report.comments)
    report: Report;

    @ManyToOne(() => User, (user) => user.comments)
    user: User;
}

