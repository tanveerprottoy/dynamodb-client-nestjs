import { Injectable } from "@nestjs/common";
import { CreateAppDto } from "./create-app.dto";
import { App } from "./data/models/app.entity";
import { v4 as uuidv4 } from 'uuid';
import { deleteEntity, getEntities, getEntity, putEntity } from "./data/db-app.ops";

@Injectable()
export class AppRepository {

    /* constructor(
    ) { } */

    async create(dto: CreateAppDto): Promise<any> {
        try {
            console.log(dto);
            const { name } = dto;
            const entity = {
                id: uuidv4(),
                name
            } as App;
            return await putEntity(entity);
        }
        catch(e) {
            console.log(e);
            return null;
        }
    }

    async findAll(): Promise<any> {
        try {
            return await getEntities();
        }
        catch(e) {
            console.log(e);
            return [];
        }
    }

    async findOne(id: string): Promise<any> {
        try {
            return await getEntity(id);
        }
        catch(e) {
            console.log(e);
            return null;
        }
    }

    async delete(id: string): Promise<any> {
        try {
            return await deleteEntity(id);
        }
        catch(e) {
            console.log(e);
            return null;
        }
    }
}