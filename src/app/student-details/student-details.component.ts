import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Subscription } from 'rxjs';
import { Course } from '../home/course-list/course.model';
import { Student } from '../home/student-list/student.model';
import { StudentService } from '../home/student-list/student.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css'],
})
export class StudentDetailsComponent implements OnInit, OnDestroy {
  student: Student | undefined;
  isStudentExist: boolean = true;
  isCoursesExist: boolean = true;
  coursesTaken: Course[] = [];
  currentComponent: string = 'courses';
  modalRef: MdbModalRef<ModalComponent> | undefined;
  subscription: Subscription | undefined;

  constructor(
    private modalService: MdbModalService,
    private studentService: StudentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription =
      this.studentService.studentEnrolledInCourseListChanged.subscribe(
        (studentId) => {
          this.getCoursesStudentEnrolledIn(studentId);
        }
      );

    this.route.params.subscribe((params: Params) => {
      this.studentService.getStudent(params['id']).subscribe({
        next: (student: Student) => {
          this.student = student;
        },
        error: (error: any) => {
          this.isStudentExist = false;
        },
      });
      this.getCoursesStudentEnrolledIn(params['id']);
    });
  }

  onEnrollStudent() {
    this.modalRef = this.modalService.open(ModalComponent, {
      data: {
        action: 'enroll-student',
        id: this.student?.id,
      },
    });
  }

  onAddGrade() {
    this.modalRef = this.modalService.open(ModalComponent, {
      data: {
        action: 'add-grade',
        coursesEnrolledIn: this.coursesTaken,
        id: this.student?.id,
      },
    });
  }

  private getCoursesStudentEnrolledIn(id: number) {
    console.log(id);
    this.studentService.getCoursesStudentIsEnrolledIn(id).subscribe({
      next: (courses: Course[]) => {
        this.coursesTaken = courses;
      },
      error: (error: any) => {
        this.isCoursesExist = false;
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
