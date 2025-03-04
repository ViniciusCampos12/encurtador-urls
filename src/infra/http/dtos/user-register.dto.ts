import { IsEmail, IsNotEmpty } from "class-validator";

export class UserRegisterDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}