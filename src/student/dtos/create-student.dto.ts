import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail, IsDateString, IsString } from "class-validator";
import { IsCPF } from "src/shared/decorators/is-cpf.decorator";

export class CreateStudentDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsCPF()
  cpf: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  birthDate: Date;

  @ApiProperty()
  @IsString()
  phone?: string;
}