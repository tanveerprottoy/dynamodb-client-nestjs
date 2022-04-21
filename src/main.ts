import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initAppTable } from './data/entities/app.schema';
import { DbClientsInstance } from "./libs/dynamodb";

async function initDynamodb() {
    initAppTable();
}

async function bootstrap() {
    DbClientsInstance.init();
    const app = await NestFactory.create(AppModule);
    initDynamodb();
    await app.listen(3000);
}

bootstrap();
