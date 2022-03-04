import { DeleteCommand, DeleteCommandInput, PutCommand, PutCommandInput, ScanCommand, ScanCommandInput, UpdateCommand, UpdateCommandInput } from "@aws-sdk/lib-dynamodb";
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
        }
    }
}

export const DbTableDataOpsInstance = new DbTableDataOps();