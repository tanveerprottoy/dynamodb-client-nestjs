import { IsNotEmpty } from 'class-validator';

export class CreateAppDto {
    @IsNotEmpty()
    readonly name: string;
}
