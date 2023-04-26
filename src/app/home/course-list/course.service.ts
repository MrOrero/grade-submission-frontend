import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Subject, tap, throwError } from 'rxjs';
import { Grade } from '../../shared/grade.model';
import { Student } from '../student-list/student.model';
import { CourseResponse } from './course-response.model';
import { Course } from './course.model';

@Injectable({ providedIn: 'root' })
export class CourseService {
  courseListChanged = new Subject<Course[]>();
  private courseList: Course[] = [];

  constructor(private http: HttpClient) {}

  getCourses(page: number, size: number) {
    return this.http
      .get<CourseResponse>(
        `http://localhost:8080/course/all?page=${page}&size=${size}`
      )
      .pipe(
        tap((courses: CourseResponse) => {
          this.setCourses(courses.courses);
        })
      );
  }

  getCourse(id: number) {
    return this.http
      .get<Course>('http://localhost:8080/course/' + id)
      .pipe(catchError(this.handleCourseDoesNotExistError));
  }

  getCourseGrades(id: number) {
    return this.http.get<Grade[]>('http://localhost:8080/grade/course/' + id);
  }

  addCourse(course: Course) {
    return this.http
      .post<Course>('http://localhost:8080/course', {
        subject: course.subject,
        code: course.code,
        description: course.description,
      })
      .pipe(
        tap((course: any) => {
          this.courseList.push(course);
          this.courseListChanged.next(this.courseList.slice());
        })
      );
  }

  deleteCourse(id: number) {
    return this.http.delete<Course>('http://localhost:8080/course/' + id).pipe(
      tap(() => {
        const courseIndex = this.courseList.findIndex(
          (course) => course.id === id
        );
        this.courseList.splice(courseIndex, 1);
        this.courseListChanged.next(this.courseList.slice());
      })
    );
  }

  getStudentEnrolledInCourse(courseId: number) {
    return this.http.get<Student[]>(
      'http://localhost:8080/course/' + courseId + '/students'
    );
  }

  setCourses(courses: Course[]) {
    this.courseList = courses;
    this.courseListChanged.next(this.courseList.slice());
  }

  private handleCourseDoesNotExistError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.error.message));
  }
}
