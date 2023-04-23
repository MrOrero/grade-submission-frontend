import { Course } from '../home/course-list/course.model';
import { Student } from '../home/student-list/student.model';

export interface Grade {
  id: number;
  score: string;
  student: Student;
  course: Course;
}
