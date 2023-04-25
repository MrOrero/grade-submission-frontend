import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject, tap, throwError } from 'rxjs';
import { Grade } from '../../shared/grade.model';
import { Course } from '../course-list/course.model';
import { StudentResponse } from './student-reponse.model';
import { Student } from './student.model';

@Injectable({ providedIn: 'root' })
export class StudentService {
  studentListChanged = new Subject<Student[]>();
  studentEnrolledInCourseListChanged = new Subject<number>();
  studentGradeListChanged = new Subject<number>();

  private studentList: Student[] = [];

  constructor(private http: HttpClient) {}

  getStudents(page: number, size: number) {
    return this.http
      .get<StudentResponse>(
        `http://localhost:8080/student/all?page=${page}&size=${size}`
      )
      .pipe(
        tap((students: StudentResponse) => {
          this.setStudents(students.students);
        })
      );
  }

  getStudent(id: number) {
    return this.http
      .get<Student>('http://localhost:8080/student/' + id)
      .pipe(catchError(this.handleStudentDoesNotExistError));
  }

  getCoursesStudentIsEnrolledIn(studentId: number) {
    return this.http.get<Course[]>(
      'http://localhost:8080/student/' + studentId + '/courses'
    );
  }

  getStudentGrades(studentId: number) {
    return this.http.get<Grade[]>(
      'http://localhost:8080/grade/student/' + studentId
    );
  }

  addStudent(student: Student) {
    return this.http
      .post<Student>('http://localhost:8080/student', {
        name: student.name,
        department: student.department,
        birthDate: student.birthDate,
        gender: student.gender,
      })
      .pipe(
        tap((student: any) => {
          this.studentList.push(student);
          this.studentListChanged.next(this.studentList.slice());
        })
      );
  }

  deleteStudent(id: number) {
    return this.http
      .delete<Student>('http://localhost:8080/student/' + id)
      .pipe(
        tap(() => {
          const studentIndex = this.studentList.findIndex(
            (student) => student.id === id
          );
          this.studentList.splice(studentIndex, 1);
          this.studentListChanged.next(this.studentList.slice());
        })
      );
  }

  enrollStudentInCourse(studentId: number, courseCode: string) {
    return this.http
      .put<Course>('http://localhost:8080/course/student/' + studentId, {
        code: courseCode,
      })
      .pipe(
        tap(() => {
          this.studentEnrolledInCourseListChanged.next(studentId);
        }),
        catchError(this.handleCourseDoesNotExistError)
      );
  }

  addStudentGrade(studentId: number, courseId: number, grade: string) {
    return this.http
      .post<Grade>(
        'http://localhost:8080/grade/student/' +
          studentId +
          '/course/' +
          courseId,
        {
          score: grade,
        }
      )
      .pipe(
        tap(() => {
          this.studentGradeListChanged.next(studentId);
        })
      );
  }

  updateStudentGrade(studentId: number, courseId: number, grade: string) {
    return this.http
      .put<Grade>(
        'http://localhost:8080/grade/student/' +
          studentId +
          '/course/' +
          courseId,
        {
          score: grade,
        }
      )
      .pipe(
        tap(() => {
          this.studentGradeListChanged.next(studentId);
        })
      );
  }

  deleteStudentGrade(studentId: number, courseId: number) {
    return this.http
      .delete(
        'http://localhost:8080/grade/student/' +
          studentId +
          '/course/' +
          courseId
      )
      .pipe(
        tap(() => {
          this.studentGradeListChanged.next(studentId);
        })
      );
  }

  setStudents(students: Student[]) {
    this.studentList = students;
    this.studentListChanged.next(this.studentList.slice());
  }

  private handleStudentDoesNotExistError(
    error: HttpErrorResponse
  ): Observable<any> {
    return throwError(() => new Error(error.error.message));
  }

  private handleCourseDoesNotExistError(
    error: HttpErrorResponse
  ): Observable<any> {
    return throwError(() => new Error(error.error.message));
  }

  //   getRecipe(index: number) {
  //     return this.recipes[index];
  //   }

  //   addRecipe(recipe: Student) {
  //     this.recipes.push(recipe);
  //     this.recipesChanged.next(this.recipes.slice());
  //   }

  //   updateRecipe(index: number, newRecipe: Student) {
  //     this.recipes[index] = newRecipe;
  //     this.recipesChanged.next(this.recipes.slice());
  //   }
}
