import { CreateTableCommand, CreateTableInput, DeleteTableCommand, DeleteTableInput, DescribeTableCommand, DescribeTableInput, ListTablesCommand, ListTablesInput } from "@aws-sdk/client-dynamodb";
import { Logger } from "@nestjs/common";
import { DbClientsInstance } from "./db.clients";

class DbTableOps {
    private static instance: DbTableOps;

    private constructor() {
        console.log('DbTableOps init');
        if(DbTableOps.instance) {
            throw new Error("Error - already initialized");
        }
    }

    static getInstance(): DbTableOps {
        DbTableOps.instance = DbTableOps.instance || new DbTableOps();
        return DbTableOps.instance;
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
            console.log(e);
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
            console.log(e);
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
            console.log(e);
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
            console.log(e);
        }
    }
}

export const DbTableOpsInstance = DbTableOps.getInstance();