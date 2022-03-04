import { CreateTableCommand, CreateTableInput } from "@aws-sdk/client-dynamodb";
import { DbTableOpsInstance } from "../db-table.ops";
import { DbClientsInstance } from '../db.clients'

const appTableParams: CreateTableInput = {
    TableName: 'App',
    KeySchema: [
        {
            AttributeName: 'id',
            KeyType: 'HASH'
        }
    ],
    AttributeDefinitions: [
        { AttributeName: "id", AttributeType: "S" },
        // { AttributeName: "name", AttributeType: "S" }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 2,
        WriteCapacityUnits: 2
    }
}

export function initAppTable() {
    console.log('initAppTable');
    //DbTableOpsInstance.create(appTableParams);
    DbTableOpsInstance.list();
}  