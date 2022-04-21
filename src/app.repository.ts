import { Injectable } from "@nestjs/common";
import { CreateAppDto } from "./create-app.dto";
import { App } from "./data/entities/app.entity";
import { v4 as uuidv4 } from 'uuid';
import { DbDataOpsInstance } from "./libs/dynamodb";
import { DeleteCommandInput, GetCommandInput, PutCommandInput, ScanCommandInput } from "@aws-sdk/lib-dynamodb";
import { Constants } from "./constants";

@Injectable()
export class AppRepository {



    async create(dto: CreateAppDto): Promise<any> {
        try {
            console.log(dto);
            const { name } = dto;
            const item = {
                id: uuidv4(),
                name
            } as App;
            const params: PutCommandInput = {
                TableName: Constants.APPS_TABLE,
                Item: item
            };
            const data = await DbDataOpsInstance.put(params);
            console.log(data);
            if(data.$metadata.httpStatusCode == Constants.HTTP_200) {
                return item as unknown as Notification;
            }
            return null;
        }
        catch(e) {
            console.log(e);
            return null;
        }
    }

    async findAll(): Promise<any> {
        try {
            const params: ScanCommandInput = {
                TableName: Constants.APPS_TABLE,
                Limit: 10
            };
            const data = await DbDataOpsInstance.scan(params);
            console.log(data);
            return data.Items;
        }
        catch(e) {
            console.error(e);
            return [];
        }
    }

    async findOne(id: string): Promise<any> {
        try {
            const params: GetCommandInput = {
                TableName: Constants.APPS_TABLE,
                Key: {
                    id: id
                }
            }
            const data = await DbDataOpsInstance.get(params);
            return data.Item;
        }
        catch(e) {
            console.error(e);
            return null;
        }
    }

    async delete(id: string): Promise<any> {
        try {
            const params: DeleteCommandInput = {
                TableName: Constants.APPS_TABLE,
                Key: {
                    id: id
                }
            };
            const data = await DbDataOpsInstance.delete(params);
            return data.Item;
        }
        catch(e) {
            console.log(e);
            return null;
        }
    }
}