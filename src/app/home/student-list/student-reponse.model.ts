import { Student } from './student.model';

export interface StudentResponse {
  students: Student[];
  totalStudents: number;
}
