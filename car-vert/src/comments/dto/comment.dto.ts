import { Expose, Type } from 'class-transformer';

class NestedReportDto {
    @Expose()
    id: number;

    @Expose()
    make: string;

    @Expose()
    model: string;
}

export class CommentDto {
    @Expose()
    id: number;

    @Expose()
    content: string;

    @Expose()
    @Type(() => NestedReportDto)
    report: NestedReportDto;
}