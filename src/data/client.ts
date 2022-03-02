import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const dynamoClient = new DynamoDBClient(
    {
        region: 'local', // process.env.AWS_REGION,
        endpoint: 'http://localhost:8000', // process.env.DB_ENDPOINT,
        credentials: {
            accessKeyId: 'fake',// process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: 'fake'// process.env.AWS_SECRET_ACCESS_KEY,
        }
    }
);

export const docClient = DynamoDBDocumentClient.from(dynamoClient);