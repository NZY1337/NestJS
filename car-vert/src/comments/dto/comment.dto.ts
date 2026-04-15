import { Expose, Type, Transform } from 'class-transformer';

class NestedUserDto {
    @Expose()
    id: number;

    @Expose()
    email: string;
    // and other User props as needed
}

class NestedReportDto {
    @Expose()
    id: number;

    @Transform(({ obj }) => obj.user?.id)
    @Expose()
    userId: number;

    // and other Report props as needed
}

export class CommentDto {
    @Expose()
    id: number;

    @Expose()
    content: string;

    @Expose()
    @Type(() => NestedReportDto)
    report: NestedReportDto;

    @Expose()
    @Type(() => NestedUserDto)
    user: NestedUserDto;
}