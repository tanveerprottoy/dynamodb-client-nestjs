import { HttpStatus, Injectable } from '@nestjs/common';
import { Constants } from "./constants";
import { CreateAppDto } from './create-app.dto';
import { ErrorUtils } from "./error.utils";
import { SampleRepository } from "./sample.repository";

@Injectable()
export class SampleService {

    constructor(
        private readonly repository: SampleRepository
    ) { }

    async create(dto: CreateAppDto): Promise<any> {
        const data = await this.repository.create(dto);
        if(data instanceof Error) {
            ErrorUtils.throwHttpError(
                Constants.GENERIC_ERROR,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
        if(!data) {
            ErrorUtils.throwHttpError(
                Constants.BAD_REQ,
                HttpStatus.BAD_REQUEST,
            );
        }
        return data;
    }

    async findAll(): Promise<any> {
        const startKey = "";
        const expression = "pk = :p0 and begins_with(sk, :p1)";
        const filterExpression = "key <> :p2";
        const expressionAttributeValues = {
            ":p0": "pkValue",
            ":p1": "sk",
            ":p2": "filter",
        };
        return await this.repository.findAll(
            expression,
            expressionAttributeValues,
            true,
            100,
            JSON.parse(startKey),
            "indexName",
            filterExpression,
        );
    }

    async findAllWithPagination(): Promise<any> {
        const expression = "pk = :p0 and begins_with(sk, :p1)";
        const filterExpression = "key <> :p2";
        const expressionAttributeValues = {
            ":p0": "pkValue",
            ":p1": "sk",
            ":p2": "filter",
        };
        let items = [];
        items = await this.findAllPaginated(
            expression,
            expressionAttributeValues,
            filterExpression,
            items,
            "indexName",
        );
        return items;
    }

    async findAllPaginated(
        expression: string,
        expressionAttributeValues: any,
        filterExpression: string,
        items: any[],
        indexName?: string,
        startKey?: any,
    ) {
        let data: any;
        if(startKey) {
            data = await this.repository.findAll(
                expression,
                expressionAttributeValues,
                true,
                0,
                startKey,
                indexName,
                filterExpression
            );
        }
        else {
            data = await this.repository.findAll(
                expression,
                expressionAttributeValues,
                true,
                0,
                null,
                indexName,
                filterExpression
            );
        }
        if(data instanceof Error) {
            return items;
        }
        if(!data) {
            return items;
        }
        if(data.items.length > 0) {
            items = [...items, ...data.items];
        }
        if(data.lastKey) {
            await this.findAllPaginated(
                expression,
                expressionAttributeValues,
                filterExpression,
                items,
                indexName,
                data.lastKey
            );
        }
        else {
            return items;
        }
    }

    async findOne(id: string): Promise<any> {
        const data = await this.repository.findOne(
            "pkValue",
            id
        );
        if(data instanceof Error) {
            ErrorUtils.throwHttpError();
        }
        if(!data) {
            ErrorUtils.throwHttpError(
                Constants.NOT_FOUND,
                HttpStatus.NOT_FOUND,
            );
        }
        return data;
    }

    async update(
        id: string,
        payload: any,
    ): Promise<any> {
        const updateExpression = `set field0 = :p0, field1 = :p1`;
        const expressionAttributeValues = {
            ":p0": payload.field0,
            ":p1": payload.field1,
        };
        const data = await this.repository.update(
            {
                pk: "pkValue",
                sk: id
            },
            updateExpression,
            expressionAttributeValues,
        );
        if(data instanceof Error) {
            ErrorUtils.throwHttpError();
        }
        if(!data) {
            ErrorUtils.throwHttpError(
                Constants.NOT_FOUND,
                HttpStatus.NOT_FOUND,
            );
        }
        return data;
    }

    async delete(id: string): Promise<any> {
        return await this.repository.delete(
            "pkValue",
            id,
        );
    }
}
