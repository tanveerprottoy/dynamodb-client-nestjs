import { BatchGetCommand, BatchGetCommandInput, DeleteCommand, DeleteCommandInput, GetCommand, GetCommandInput, PutCommand, PutCommandInput, QueryCommand, QueryCommandInput, ScanCommand, ScanCommandInput, UpdateCommand, UpdateCommandInput } from "@aws-sdk/lib-dynamodb";
import { Logger } from "@nestjs/common";
import { DbClientsInstance } from "./db.clients";

class DbDataOps {
    private static instance: DbDataOps;

    private constructor() {
        console.log('DbTableDataOps init');
        if(DbDataOps.instance) {
            throw new Error("Error - already initialized");
        }
    }

    static getInstance(): DbDataOps {
        DbDataOps.instance = DbDataOps.instance || new DbDataOps();
        return DbDataOps.instance;
    }

    put = async (
        params: PutCommandInput
    ) => {
        try {
            return await DbClientsInstance.dbDocumentClient.send(
                new PutCommand(params)
            );
        }
        catch(e) {
            Logger.error(e);
            return e;
        }
    }

    update = async (
        params: UpdateCommandInput
    ) => {
        try {
            return await DbClientsInstance.dbDocumentClient.send(
                new UpdateCommand(params)
            );
        }
        catch(e) {
            Logger.error(e);
            return e;
        }
    }

    scan = async (
        params: ScanCommandInput
    ) => {
        try {
            return await DbClientsInstance.dbDocumentClient.send(
                new ScanCommand(params)
            );
        }
        catch(e) {
            Logger.error(e);
            return e;
        }
    }

    query = async (
        params: QueryCommandInput
    ) => {
        try {
            return await DbClientsInstance.dbDocumentClient.send(
                new QueryCommand(params)
            );
        }
        catch(e) {
            Logger.error(e);
            return e;
        }
    }

    get = async (
        params: GetCommandInput
    ) => {
        try {
            return await DbClientsInstance.dbDocumentClient.send(
                new GetCommand(params)
            );
        }
        catch(e) {
            Logger.error(e);
            return e;
        }
    }

    batchGet = async (
        params: BatchGetCommandInput
    ) => {
        try {
            return await DbClientsInstance.dbDocumentClient.send(
                new BatchGetCommand(params)
            );
        }
        catch(e) {
            Logger.error(e);
            return e;
        }
    }

    delete = async (
        params: DeleteCommandInput
    ) => {
        try {
            return await DbClientsInstance.dbDocumentClient.send(
                new DeleteCommand(params)
            );
        }
        catch(e) {
            Logger.error(e);
            return e;
        }
    }
}

export const DbDataOpsInstance = DbDataOps.getInstance();