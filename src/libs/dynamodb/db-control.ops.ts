import { CreateTableCommand, CreateTableInput, DeleteTableCommand, DeleteTableInput, DescribeTableCommand, DescribeTableInput, ListTablesCommand, UpdateTableCommand, UpdateTableInput } from "@aws-sdk/client-dynamodb";
import { ErrorUtils } from "../../error.utils";
import { DbClientsInstance } from "./db.clients";

class DbControlOps {
    private static instance: DbControlOps;

    private constructor() {
        console.log('DbControlOps init');
        if(DbControlOps.instance) {
            throw new Error("Error - already initialized");
        }
    }

    static getInstance(): DbControlOps {
        DbControlOps.instance = DbControlOps.instance || new DbControlOps();
        return DbControlOps.instance;
    }

    create = async (
        params: CreateTableInput
    ) => {
        try {
            return await DbClientsInstance.dbDocumentClient.send(
                new CreateTableCommand(params)
            );
        }
        catch(e) {
            ErrorUtils.throwError(e);
        }
    }

    update = async (
        params: UpdateTableInput
    ) => {
        try {
            return await DbClientsInstance.dbDocumentClient.send(
                new UpdateTableCommand(params)
            );
        }
        catch(e) {
            ErrorUtils.throwError(e);
        }
    }

    list = async () => {
        try {
            return await DbClientsInstance.dbDocumentClient.send(
                new ListTablesCommand({})
            );
        }
        catch(e) {
            ErrorUtils.throwError(e);
        }
    }

    describe = async (
        params: DescribeTableInput
    ) => {
        try {
            return await DbClientsInstance.dbDocumentClient.send(
                new DescribeTableCommand(params)
            );
        }
        catch(e) {
            ErrorUtils.throwError(e);
        }
    }

    delete = async (
        params: DeleteTableInput
    ) => {
        try {
            return await DbClientsInstance.dbDocumentClient.send(
                new DeleteTableCommand(params)
            );
        }
        catch(e) {
            ErrorUtils.throwError(e);
        }
    }
}

export const DbControlOpsInstance = DbControlOps.getInstance();