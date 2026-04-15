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

@Controller('reports')
@Serialize(ReportDto)
export class ReportsController {
    constructor(private reportService: ReportsService) { }

    @Post()
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
        return this.reportService.create(body, user);
    }

    @Get('/:id')
    getReport(@Param('id') id: string) {
        return this.reportService.getReport(id);
    }

    @Get()
    getAllReports(@Req() req: Request & { session: { userId: number } }) {
        const userId = req.session.userId;
        return this.reportService.getAllReports(userId);
    }

    @Patch('/:id')
    @UseGuards(AdminGuard)
    approveReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
        return this.reportService.changeApproval(parseInt(id), body.approved);
    }
}
