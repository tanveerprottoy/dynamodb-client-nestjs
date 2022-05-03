import { VersioningType } from "@nestjs/common";
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Constants } from "./constants";
import { initAppTable } from './data/entities/app.schema';
import { DbClientsInstance } from "./libs/dynamodb";

async function initDynamodb() {
    initAppTable();
}

async function bootstrap() {
    DbClientsInstance.init();
    initDynamodb();
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix(Constants.API);
    app.enableVersioning({
        type: VersioningType.URI,
    });
    await app.listen(3000);
}

bootstrap();
