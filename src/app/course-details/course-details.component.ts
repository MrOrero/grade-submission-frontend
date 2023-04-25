import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Course } from '../home/course-list/course.model';
import { CourseService } from '../home/course-list/course.service';
import { Student } from '../home/student-list/student.model';
import { Grade } from '../shared/grade.model';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css'],
})
export class CourseDetailsComponent implements OnInit {
  course: Course | undefined;
  studentsEnrolled: Student[] = [];
  isStudentsExist: boolean = true;
  isCourseExist: boolean = true;
  currentComponent: string = 'students';
  gradesList: Grade[] = [];

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.courseService.getCourse(params['id']).subscribe({
        next: (course: Course) => {
          this.course = course;
        },
        error: (error: any) => {
          this.isCourseExist = false;
        },
      });
      this.getStudentEnrolledInCourse(params['id']);

      this.courseService
        .getCourseGrades(params['id'])
        .subscribe((grades: Grade[]) => {
          this.gradesList = grades;
        });
    });
  }

  onGrades() {
    this.currentComponent = 'grades';
  }
  private getStudentEnrolledInCourse(id: number) {
    console.log(id);
    this.courseService.getStudentEnrolledInCourse(id).subscribe({
      next: (students: Student[]) => {
        this.studentsEnrolled = students;
      },
      error: (error: any) => {
        this.isStudentsExist = false;
      },
    });
  }
}
