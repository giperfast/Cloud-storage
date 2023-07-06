import { IsString, ValidateIf } from 'class-validator'
import { Type, Transform } from 'class-transformer';

export class CreateUserDto {
    @Type(() => String)
    @IsString()
    name: string;

    @Type(() => String)
    @IsString()
    @Transform(({ value }) => value === '' ? null : value)
    path: string | null;

    @Type(() => String)
    @IsString()
    @Transform(({ value }) => value === '' ? null : value)
    parent: string | null;
}
