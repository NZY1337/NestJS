// src/reports/dto/like.dto.ts
import { Expose } from 'class-transformer';

export class LikeDto {
    @Expose()
    id: number;

    @Expose()
    email: string;
}