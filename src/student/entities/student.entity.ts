import { PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, Entity } from "typeorm";
import { CpfHelper } from "../utils/cpf.helper";
import { IsCPF } from "src/shared/decorators/is-cpf.decorator";
import { IsNotEmpty, IsEmail, IsDateString, IsString } from "class-validator";

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  idStudent: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column({ unique: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Column({ unique: true })
  @IsNotEmpty()
  @IsCPF()
  cpf: string;

  @Column()
  @IsString()
  phone: string;

  @Column()
  @IsNotEmpty()
  @IsDateString()
  birthDate: Date;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async formatAndValidateCpf() {
    try {
      this.cpf = CpfHelper.formatAndValidate(this.cpf);
    } catch (error) {
      throw new Error(`Erro ao validar CPF: ${error.message}`);
    }
  }

  // Método para exibição formatada (opcional)
  get formattedCpf(): string {
    return CpfHelper.formatForDisplay(this.cpf);
  }
}