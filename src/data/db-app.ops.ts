import { ScanCommand } from "@aws-sdk/client-dynamodb"
import { DeleteCommand, DeleteCommandInput, GetCommand, GetCommandInput, PutCommand, PutCommandInput, ScanCommandInput } from "@aws-sdk/lib-dynamodb"
import { DbTableDataOpsInstance } from "./db-table-data.ops"
import { DbClientsInstance } from "./db.clients"
import { App } from "./models/app.entity"

export const putEntity = async (entity: App) => {
    const params: PutCommandInput = {
        TableName: 'Apps',
        Item: {
            id: entity.id,
            name: entity.name
        }
    }
    return await DbTableDataOpsInstance.put(params);
}

export const getEntities = async () => {
    const params: ScanCommandInput = {
        TableName: 'Apps'
    }
    const command = new ScanCommand(params);
    return DbClientsInstance.dbDocumentClient.send(command);
}

export const getEntity = async (id: string) => {
    const params: GetCommandInput = {
        TableName: 'Apps',
        Key: {
            id: id
        }
    }
    const command = new GetCommand(params);
    return DbClientsInstance.dbDocumentClient.send(command);
}

export const deleteEntity = async (id: string) => {
    const params: DeleteCommandInput = {
        TableName: 'Apps',
        Key: {
            id: id
        }
    }
    const command = new DeleteCommand(params);
    return DbClientsInstance.dbDocumentClient.send(command);
}