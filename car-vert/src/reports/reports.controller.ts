import {
    Controller,
    Post,
    Get,
    Body,
    UseGuards,
    Req,
    Patch,
    Param,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateReportDto } from './dto/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { ReportDto } from './dto/report.dto';
import { Serialize } from '../interceptors/serialize.interceptors';
import { ApproveReportDto } from './dto/approve-report.dto';
import { LikeDto } from './dto/like-raport.dto';

@UseGuards(AdminGuard)
@Controller('reports')
export class ReportsController {
    constructor(private reportService: ReportsService) { }

    @Post()
    @Serialize(ReportDto)
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
        return this.reportService.create(body, user);
    }

    @Get('/:id')
    @Serialize(ReportDto)
    getReport(@Param('id') id: string) {
        return this.reportService.getReport(parseInt(id));
    }

    @Get()
    @Serialize(ReportDto)
    getAllReports(@Req() req: Request & { session: { userId: number } }) {
        const userId = req.session.userId;
        return this.reportService.getAllReports(userId);
    }

    @Patch('/:id')
    @Serialize(ReportDto)
    approveReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
        return this.reportService.changeApproval(parseInt(id), body.approved);
    }

    @Post('/:id/like')
    @Serialize(LikeDto)
    likeReport(@Param('id') id: string, @CurrentUser() user: User) {
        return this.reportService.likeReport(parseInt(id), user);
    }

    @Get('/:id/like')
    @Serialize(LikeDto)
    getLikes(@Param('id') id: string) {
        return this.reportService.getLikes(parseInt(id));
    }
}
