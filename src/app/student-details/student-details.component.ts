import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Course } from '../home/course-list/course.model';
import { Student } from '../home/student-list/student.model';
import { StudentService } from '../home/student-list/student.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css'],
})
export class StudentDetailsComponent implements OnInit {
  student: Student | undefined;
  isStudentExist: boolean = true;
  isCoursesExist: boolean = true;
  coursesTaken: Course[] = [];
  currentComponent: string = 'courses';

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log(this.currentComponent);
    this.route.params.subscribe((params: Params) => {
      this.studentService.getStudent(params['id']).subscribe({
        next: (student: Student) => {
          this.student = student;
        },
        error: (error: any) => {
          this.isStudentExist = false;
        },
      });

      this.studentService
        .getCoursesStudentIsEnrolledIn(params['id'])
        .subscribe({
          next: (courses: Course[]) => {
            this.coursesTaken = courses;
          },
          error: (error: any) => {
            this.isCoursesExist = false;
          },
        });
    });
  }
}
