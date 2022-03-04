import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DbClientsProvider {
    public dynamoClient: DynamoDBClient;
    public dbDocumentClient: DynamoDBDocumentClient

    constructor() {
        console.log('DbClient init');
        this.dynamoClient = new DynamoDBClient(
            {
                region: 'local', // process.env.AWS_REGION,
                endpoint: 'http://localhost:8000', // process.env.DB_ENDPOINT,
                credentials: {
                    accessKeyId: 'fake',// process.env.AWS_ACCESS_KEY_ID,
                    secretAccessKey: 'fake'// process.env.AWS_SECRET_ACCESS_KEY,
                }
            }
        );
        this.dbDocumentClient = DynamoDBDocumentClient.from(
            this.dynamoClient
        );
    }
}
