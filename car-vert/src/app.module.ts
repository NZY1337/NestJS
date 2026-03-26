import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportsModule } from './reports/reports.module';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';

@Module({
    imports: [
        // this will be shared down to all modules
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'db.sqlite',
            entities: [User, Report],
            synchronize: true,
        }),
        ReportsModule, UsersModule],
    controllers: [AppController],
    providers: [AppService],
})

export class AppModule { }
