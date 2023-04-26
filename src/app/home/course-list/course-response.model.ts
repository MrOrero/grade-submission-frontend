import { Course } from './course.model';

export interface CourseResponse {
  courses: Course[];
  totalCourses: number;
}
