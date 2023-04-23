import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject, tap, throwError } from 'rxjs';
import { Grade } from '../../shared/grade.model';
import { Course } from '../course-list/course.model';
import { Student } from './student.model';

@Injectable({ providedIn: 'root' })
export class StudentService {
  studentListChanged = new Subject<Student[]>();

  private studentList: Student[] = [];

  constructor(private http: HttpClient) {}

  getStudents() {
    return this.http.get<Student[]>('http://localhost:8080/student/all').pipe(
      tap((students: any) => {
        this.setStudents(students);
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

  setStudents(students: Student[]) {
    this.studentList = students;
    this.studentListChanged.next(this.studentList.slice());
  }

  handleStudentDoesNotExistError(error: HttpErrorResponse): Observable<any> {
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
