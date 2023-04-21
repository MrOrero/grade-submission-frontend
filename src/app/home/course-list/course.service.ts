import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { Course } from './course.model';

@Injectable({ providedIn: 'root' })
export class CourseService {
  courseListChanged = new Subject<Course[]>();
  private courseList: Course[] = [];

  constructor(private http: HttpClient) {}

  getStudents() {
    return this.http.get<Course[]>('http://localhost:8080/course/all').pipe(
      tap((courses: any) => {
        this.setCourses(courses);
      })
    );
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

  setCourses(courses: Course[]) {
    this.courseList = courses;
    this.courseListChanged.next(this.courseList.slice());
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
