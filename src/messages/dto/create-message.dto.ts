import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"

export class CreateMessageDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(255)
    readonly text: string

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(50)
    readonly of: string

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(50)
    readonly from: string 
}