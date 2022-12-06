import { HttpStatus, Injectable } from "@nestjs/common";
import { CreateAppDto } from "./create-app.dto";
import { App } from "./data/entities/app.entity";
import { v4 as uuidv4 } from 'uuid';
import { DbDataOpsInstance } from "./libs/dynamodb";
import { DeleteCommandInput, GetCommandInput, PutCommand, PutCommandInput, ScanCommandInput, UpdateCommandInput } from "@aws-sdk/lib-dynamodb";
import { Constants } from "./constants";
import { DbClientsProvider } from "./data/db-clients.provider";

@Injectable()
export class AppRepository {

    constructor(
        private readonly dbClientsProvider: DbClientsProvider
    ) { }

    async create(dto: CreateAppDto): Promise<App | null> {
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
                return item;
            }
            return null;
        }
        catch(e) {
            console.error(e);
            return null;
        }
    }

    async createWithProvider(dto: CreateAppDto): Promise<App | null> {
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
            const data = await this.dbClientsProvider.dbDocumentClient.send(
                new PutCommand(params)
            );
            console.log(data);
            if(data.$metadata.httpStatusCode == Constants.HTTP_200) {
                return item;
            }
            return null;
        }
        catch(e) {
            console.error(e);
            return null;
        }
    }

    async findAll(): Promise<any[]> {
        try {
            const params: ScanCommandInput = {
                TableName: Constants.APPS_TABLE,
                Limit: 10
            };
            const data = await DbDataOpsInstance.scan(params);
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

    async update(id: string): Promise<any> {
        try {
            const params: UpdateCommandInput = {
                TableName: Constants.APPS_TABLE,
                Key: {
                    id: id
                }
            }
            const data = await DbDataOpsInstance.update(params);
            return data.Attributes;
        }
        catch(e) {
            console.error(e);
            return null;
        }
    }

    async delete(id: string): Promise<boolean> {
        try {
            const params: DeleteCommandInput = {
                TableName: Constants.APPS_TABLE,
                Key: {
                    id: id
                }
            };
            const data = await DbDataOpsInstance.delete(params);
            if(data.$metadata.httpStatusCode === HttpStatus.OK) {
                return true;
            }
            return false;
        }
        catch(e) {
            return false;
        }
    }
}