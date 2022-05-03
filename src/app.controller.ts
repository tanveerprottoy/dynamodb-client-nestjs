import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateAppDto } from './create-app.dto';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Post()
    async create(@Body() dto: CreateAppDto): Promise<any> {
        return await this.appService.create(dto);
    }

    @Get()
    async findAll(): Promise<any> {
        return await this.appService.findAll();
    }

    @Get()
    async findOne(id: string): Promise<any> {
        return await this.appService.findOne(id);
    }

    @Patch()
    async update(id: string): Promise<any> {
        return await this.appService.update(id);
    }

    @Delete()
    async delete(id: string): Promise<any> {
        return await this.appService.delete(id);
    }
}
