import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppRepository } from './app.repository';
import { AppService } from './app.service';
import { DbClientsProvider } from "./data/db-clients.provider";
import { SampleRepository } from "./sample.repository";
import { SampleService } from "./sample.service";

@Module({
    imports: [
        ConfigModule.forRoot()
    ],
    controllers: [AppController],
    providers: [
        AppService,
        SampleService,
        DbClientsProvider,
        AppRepository,
        SampleRepository,
    ],
})
export class AppModule { }
