import { Body, ConflictException, Controller, Get, InternalServerErrorException, Post, Query } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dtos/create-student.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';

@Controller('student')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
  ){}

  @Post()
  async create(@Body() createStudentDto: CreateStudentDto) {
    return await this.studentService.createStudent(createStudentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista paginada de alunos' })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'offset', required: false, type: Number, example: 0 })
  @ApiQuery({ name: 'search', required: false, type: String, example: 'Maria' })
  async getAllStudents(@Query() paginationDto: PaginationDto) {
    return this.studentService.getAllStudents(paginationDto);
  };
}
