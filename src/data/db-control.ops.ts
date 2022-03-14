import { CreateTableCommand, CreateTableInput, DeleteTableCommand, DeleteTableInput, DescribeTableCommand, DescribeTableInput, ListTablesCommand, ListTablesInput, UpdateTableCommand, UpdateTableInput } from "@aws-sdk/client-dynamodb";
import { Logger } from "@nestjs/common";
import { DbClientsInstance } from "./db.clients";

class DbControlOps {
    private static instance: DbControlOps;

    private constructor() {
        console.log('DbTableOps init');
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
            Logger.error(e);
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
            Logger.error(e);
        }
    }

    list = async (
        // params: ListTablesInput
    ) => {
        try {
            return await DbClientsInstance.dbDocumentClient.send(
                new ListTablesCommand({})
            );
        }
        catch(e) {
            Logger.error(e);
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
            Logger.error(e);
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
            Logger.error(e);
        }
    }
}

export const DbControlOpsInstance = DbControlOps.getInstance();