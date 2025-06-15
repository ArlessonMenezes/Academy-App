import { Body, ConflictException, Injectable, } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudentDto } from './dtos/create-student.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
      private readonly studentRepository: Repository<Student>,
  ){}

    async createStudent(@Body() createStudentDto: CreateStudentDto) {
      console.log(createStudentDto)
      const existingStudent  = await this.studentRepository.findOne({
        where: { cpf: createStudentDto.cpf },
      })

      if (existingStudent) {
        throw new ConflictException('Já existe um aluno cadastrado com este CPF');
      };

      const newStudent = this.studentRepository.create(createStudentDto);
      const savedStudent = await this.studentRepository.save(newStudent);

      return savedStudent;
    }
    
  async getAllStudents(paginationDto: PaginationDto) {
    const  { limit = 10, offset = 0, search = '' } = paginationDto;

    const [students, total] = await this.studentRepository.findAndCount({
      where: [
        { name: Like(`%${search}%`) },
        { email: Like(`%${search}%`) },
        { cpf: Like(`%${search}%`) },
      ],
      take: limit,
      skip: offset,
      order: { createdAt: 'DESC' }
    });

    return {
      data: students,
      meta: {
        total,
        limit,
        offset,
        search,
        hasNextPage: total > offset + limit
      }
    }
  }
}
