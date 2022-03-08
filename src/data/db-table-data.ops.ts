import { BatchGetCommand, BatchGetCommandInput, DeleteCommand, DeleteCommandInput, PutCommand, PutCommandInput, QueryCommand, QueryCommandInput, ScanCommand, ScanCommandInput, UpdateCommand, UpdateCommandInput } from "@aws-sdk/lib-dynamodb";
import { DbClientsInstance } from "./db.clients";

class DbTableDataOps {

    constructor() {
        console.log('DbTableDataOps init');
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
            console.log(e);
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
            console.log(e);
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
            console.log(e);
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
            console.log(e);
            return e;
        }
    }

    get = async (
        params: ScanCommandInput
    ) => {
        try {
            return await DbClientsInstance.dbDocumentClient.send(
                new ScanCommand(params)
            );
        }
        catch(e) {
            console.log(e);
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
            console.log(e);
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
            console.log(e);
            return e;
        }
    }
}

export const DbTableDataOpsInstance = new DbTableDataOps();