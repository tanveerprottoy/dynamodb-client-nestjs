import { CreateTableCommand, CreateTableInput } from "@aws-sdk/client-dynamodb";
import { docClient } from '../client'

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
        { AttributeName: "name", AttributeType: "S" }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 2,
        WriteCapacityUnits: 2
    }
}

export function initAppTable() {
    console.log('initAppTable');
    const command = new CreateTableCommand(
        appTableParams
    );

    docClient.send(
        command
    ).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    })
}  