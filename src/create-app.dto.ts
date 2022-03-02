import { IsNotEmpty } from 'class-validator';

export class CreateAppDto {
    @IsNotEmpty()
    readonly name: string;
    @IsNotEmpty()
    readonly age: number;
}
