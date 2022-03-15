import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

class DbClients {
    private static instance: DbClients;
    public dynamoClient: DynamoDBClient;
    public dbDocumentClient: DynamoDBDocumentClient

    private constructor() {
        console.log('DbClients init');
        if(DbClients.instance) {
            throw new Error("Error - already initialized");
        }
        const marshallOptions = {
            // Whether to automatically convert empty strings, blobs, and sets to `null`.
            convertEmptyValues: false, // false, by default.
            // Whether to remove undefined values while marshalling.
            removeUndefinedValues: false, // false, by default.
            // Whether to convert typeof object to map attribute.
            convertClassInstanceToMap: false, // false, by default.
        };
        const unmarshallOptions = {
            // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
            wrapNumbers: false, // false, by default.
        };
        const translateConfig = { marshallOptions, unmarshallOptions };
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
            this.dynamoClient,
            translateConfig
        );
    }

    static getInstance(): DbClients {
        DbClients.instance = DbClients.instance || new DbClients();
        return DbClients.instance;
    }
}

export const DbClientsInstance = DbClients.getInstance();