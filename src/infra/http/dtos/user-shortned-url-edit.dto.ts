import { IsNotEmpty, IsUrl } from "class-validator";

export class UserShortnedUrlEditDto {
    @IsNotEmpty()
    @IsUrl()
    originalEndpoint: string;
}