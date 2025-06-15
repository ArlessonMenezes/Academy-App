import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto {
  @ApiProperty({
    required: false,
    default: 10,
    description: 'Limite de registros por página',
    minimum: 1
  })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit?: number;

  @ApiProperty({
    required: false,
    default: 0,
    description: 'Quantidade de registros a pular',
    minimum: 0
  })
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  offset?: number;

   @ApiProperty({
    required: false,
    description: 'Termo para busca nos campos: nome, email ou CPF'
  })
  @IsOptional()
  @Type(() => String)
  search?: string;
}