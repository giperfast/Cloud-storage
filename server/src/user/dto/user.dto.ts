import { IsString } from 'class-validator'
import { Type } from 'class-transformer';

export class UserDto {
    @Type(() => String)
    @IsString()
    username: string

    @Type(() => String)
    @IsString()
    password: string
}

export class CreateUserDto {
    @Type(() => String)
    @IsString()
    username: string;

    @Type(() => String)
    @IsString()
    password: string;
}
