import { HttpStatus, Injectable } from "@nestjs/common";
import { DbDataOpsInstance } from "./libs/dynamodb";
import { DeleteCommandInput, GetCommandInput, PutCommandInput, QueryCommandInput, UpdateCommandInput } from "@aws-sdk/lib-dynamodb";
import { Constants } from "./constants";

@Injectable()
export class SampleRepository {

    async create(item: any): Promise<any> {
        try {
            const params: PutCommandInput = {
                TableName: Constants.APPS_TABLE,
                Item: item
            };
            const response = await DbDataOpsInstance.put(params);
            if(response.$metadata.httpStatusCode === HttpStatus.OK) {
                return item;
            }
            return null;
        }
        catch(e) {
            return e;
        }
    }

    async findAll(
        keyConditionExpression: string,
        expressionAttributeValues: any,
        scanIndexForward = true,
        limit?: number,
        startKey?: any,
        indexName?: string,
        filterExpression?: string,
    ): Promise<any | Error> {
        try {
            const params: QueryCommandInput = {
                TableName: Constants.APPS_TABLE,
                KeyConditionExpression: keyConditionExpression,
                ExpressionAttributeValues: expressionAttributeValues,
                ScanIndexForward: scanIndexForward
            };
            if(indexName) {
                params.IndexName = indexName;
            }
            if(limit && limit !== 0) {
                params.Limit = limit;
            }
            if(startKey) {
                params.ExclusiveStartKey = startKey;
            }
            if(filterExpression) {
                params.FilterExpression = filterExpression;
            }
            const response = await DbDataOpsInstance.query(params);
            if(response.$metadata.httpStatusCode === HttpStatus.OK) {
                return {
                    items: response.Items,
                    limit: limit,
                    count: response.Count,
                    lastKey: response.LastEvaluatedKey,
                };
            }
            return [];
        }
        catch(e) {
            return [];
        }
    }

    async findAllForQuery(
        limit: number,
        startKey: any,
        searchQuery: string,
    ): Promise<any | Error> {
        try {
            const params: QueryCommandInput = {
                TableName: Constants.APPS_TABLE,
                KeyConditionExpression: `pk = :p0`,
                ExpressionAttributeValues: {
                    ":p0": "pkValue"
                },
                Limit: limit ?? 100,
            };
            if(startKey) {
                params.ExclusiveStartKey = startKey;
            }
            if(searchQuery) {
                params.FilterExpression = "contains(name, :p1)";
                params.ExpressionAttributeValues[":p1"] = searchQuery;
            }
            const response = await DbDataOpsInstance.query(params);
            if(response.$metadata.httpStatusCode === HttpStatus.OK) {
                return {
                    items: response.Items,
                    limit: limit,
                    count: response.Count,
                    lastKey: response.LastEvaluatedKey,
                };
            }
            return null;
        }
        catch(e) {
            return [];
        }
    }

    async findAllForIndex(
        sk: string,
        limit: number,
        startKey: any,
    ): Promise<any | Error> {
        try {
            const params: QueryCommandInput = {
                TableName: Constants.APPS_TABLE,
                IndexName: "indexName",
                KeyConditionExpression: "pk = :p0 and begins_with(sk, :p1)",
                ExpressionAttributeValues: {
                    ":p0": "pkValue",
                    ":p1": sk,
                },
                Limit: limit ?? 100,
            };
            if(startKey) {
                params.ExclusiveStartKey = startKey;
            }
            const response = await DbDataOpsInstance.query(params);
            if(response.$metadata.httpStatusCode === HttpStatus.OK) {
                return {
                    items: response.Items,
                    limit: limit,
                    count: response.Count,
                    lastKey: response.LastEvaluatedKey,
                };
            }
            return null;
        }
        catch(e) {
            return [];
        }
    }

    async findOne(
        pk: string,
        sk: string,
    ): Promise<any> {
        try {
            const params: GetCommandInput = {
                TableName: Constants.APPS_TABLE,
                Key: {
                    pk: pk,
                    sk: sk
                }
            };
            const response = await DbDataOpsInstance.get(params);
            if(response.$metadata.httpStatusCode === HttpStatus.OK) {
                return response.Item;
            }
            return null;
        }
        catch(e) {
            return e;
        }
    }

    async update(
        key: any,
        updateExpression: string,
        expressionAttributeValues: any,
        expressionAttributeNames?: any,
        returnValues = "ALL_NEW"
    ): Promise<any> {
        try {
            const params: UpdateCommandInput = {
                TableName: Constants.APPS_TABLE,
                Key: key,
                UpdateExpression: updateExpression,
                ExpressionAttributeValues: expressionAttributeValues,
                ReturnValues: returnValues
            };
            if(expressionAttributeNames) {
                params.ExpressionAttributeNames = expressionAttributeNames;
            }
            const response = await DbDataOpsInstance.update(params);
            if(response.$metadata.httpStatusCode === HttpStatus.OK) {
                return response.Attributes;
            }
            return null;
        }
        catch(e) {
            return e;
        }
    }

    async delete(
        pk: string,
        sk: string
    ): Promise<boolean> {
        try {
            const params: DeleteCommandInput = {
                TableName: Constants.APPS_TABLE,
                Key: {
                    pk: pk,
                    sk: sk,
                },
            };
            const response = await DbDataOpsInstance.delete(params);
            if(response.$metadata.httpStatusCode === HttpStatus.OK) {
                return true;
            }
            return false;
        }
        catch(e) {
            return false;
        }
    }
}