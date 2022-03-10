import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

class DbClients {
    private static instance: DbClients;
    public dynamoClient: DynamoDBClient;
    public dbDocumentClient: DynamoDBDocumentClient

    private constructor() {
        console.log('DbClient init');
        if(DbClients.instance) {
            throw new Error("Error - already initialized");
        }
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

    static getInstance(): DbClients {
        DbClients.instance = DbClients.instance || new DbClients();
        return DbClients.instance;
    }
}

export const DbClientsInstance = DbClients.getInstance();