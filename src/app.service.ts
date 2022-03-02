import { Injectable } from '@nestjs/common';
import { AppRepository } from './app.repository';
import { CreateAppDto } from './create-app.dto';

@Injectable()
export class AppService {

    constructor(
        private readonly repository: AppRepository
    ) { }

    async create(dto: CreateAppDto): Promise<any> {
        return await this.repository.create(dto);
    }

    async findAll(): Promise<any> {
        return await this.repository.findAll();
    }

    async findOne(id: string): Promise<any> {
        return await this.repository.findOne(id);
    }

    async delete(id: string): Promise<any> {
        return await this.repository.delete(id);
    }
}
