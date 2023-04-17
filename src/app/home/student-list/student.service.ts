import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { map, Subject, tap } from 'rxjs';
import { Student } from './student.model';

@Injectable({ providedIn: 'root' })
export class StudentService {
  //   studentSelected = new EventEmitter<Student>();
  studentListChanged = new Subject<Student[]>();

  // private studentList: Student[] = [
  //   new Student(1, 'John Doe', 'Mathematics', new Date(), 'male'),
  //   new Student(2, 'Jane Doe', 'Computer Science', new Date(), 'female'),
  // ];

  private studentList: Student[] = [];

  constructor(private http: HttpClient) {}

  getStudents() {
    // return this.studentList.slice();
    return this.http.get('http://localhost:8080/student/all').pipe(
      tap((students: any) => {
        this.setStudents(students);
      })
    );
  }

  setStudents(students: Student[]) {
    this.studentList = students;
    this.studentListChanged.next(this.studentList.slice());
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

  //   deleteRecipe(index: number) {
  //     this.recipes.splice(index, 1);
  //     this.recipesChanged.next(this.recipes.slice());
  //   }
}
