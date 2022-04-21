import { CreateTableInput } from "@aws-sdk/client-dynamodb";
import { Constants } from "../../constants";
import { DbControlOpsInstance } from "../../libs/dynamodb";

const appTableParams: CreateTableInput = {
    TableName: Constants.APPS_TABLE,
    KeySchema: [
        {
            AttributeName: "id",
            KeyType: "HASH"
        }
    ],
    AttributeDefinitions: [
        { AttributeName: "id", AttributeType: "S" },
        // { AttributeName: "name", AttributeType: "S" }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
    }
}

export function initAppTable() {
    console.log("initAppTable");
    DbControlOpsInstance.create(appTableParams);
    DbControlOpsInstance.list();
}  