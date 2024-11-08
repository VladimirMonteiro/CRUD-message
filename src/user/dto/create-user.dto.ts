import { IsEmail, IsNotEmpty, IsString, MaxLength, maxLength, MinLength } from "class-validator";

export class CreateUserDto {

    @IsEmail()
    email: string

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(100)
    name: string



}
