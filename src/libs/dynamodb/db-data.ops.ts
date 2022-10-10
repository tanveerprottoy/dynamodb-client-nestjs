import { BatchExecuteStatementCommand, BatchExecuteStatementCommandInput, BatchGetCommand, BatchGetCommandInput, DeleteCommand, DeleteCommandInput, ExecuteStatementCommand, ExecuteStatementCommandInput, ExecuteTransactionCommand, ExecuteTransactionCommandInput, GetCommand, GetCommandInput, PutCommand, PutCommandInput, QueryCommand, QueryCommandInput, ScanCommand, ScanCommandInput, UpdateCommand, UpdateCommandInput } from "@aws-sdk/lib-dynamodb";
import { ErrorUtils } from "../../error.utils";
import { DbClientsInstance } from "./db.clients";

class DbDataOps {
    private static instance: DbDataOps;

    private constructor() {
        console.log('DbDataOps init');
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
            ErrorUtils.throwError(e);
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
            ErrorUtils.throwError(e);
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
            ErrorUtils.throwError(e);
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
            ErrorUtils.throwError(e);
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
            ErrorUtils.throwError(e);
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
            ErrorUtils.throwError(e);
        }
    }

    executeStatement = async (
        params: ExecuteStatementCommandInput
    ) => {
        try {
            return await DbClientsInstance.dbDocumentClient.send(
                new ExecuteStatementCommand(params)
            );
        }
        catch(e) {
            ErrorUtils.throwError(e);
        }
    }

    executeTransaction = async (
        params: ExecuteTransactionCommandInput
    ) => {
        try {
            return await DbClientsInstance.dbDocumentClient.send(
                new ExecuteTransactionCommand(params)
            );
        }
        catch(e) {
            ErrorUtils.throwError(e);
        }
    }

    batchExecuteStatement = async (
        params: BatchExecuteStatementCommandInput
    ) => {
        try {
            return await DbClientsInstance.dbDocumentClient.send(
                new BatchExecuteStatementCommand(params)
            );
        }
        catch(e) {
            ErrorUtils.throwError(e);
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
            ErrorUtils.throwError(e);
        }
    }
}

export const DbDataOpsInstance = DbDataOps.getInstance();