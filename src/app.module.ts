import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppRepository } from './app.repository';
import { AppService } from './app.service';
import { DbClientsProvider } from "./data/db-clients.provider";

@Module({
    imports: [
        ConfigModule.forRoot()
    ],
    controllers: [AppController],
    providers: [
        AppService,
        DbClientsProvider,
        AppRepository
    ],
})
export class AppModule { }
