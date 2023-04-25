import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Subscription } from 'rxjs';
import { StudentService } from 'src/app/home/student-list/student.service';
import { ModalComponent } from 'src/app/modal/modal.component';
import { Grade } from 'src/app/shared/grade.model';

@Component({
  selector: 'app-grade-details',
  templateUrl: './grade-details.component.html',
  styleUrls: ['./grade-details.component.css'],
})
export class GradeDetailsComponent implements OnInit, OnDestroy {
  @Input() studentId: number | undefined;
  @Input() gradeDetails!: Grade[];
  @Input() isFromCourseDetail: boolean = false;
  faEllipsis = faEllipsis;
  subscription: Subscription | undefined;
  modalRef: MdbModalRef<ModalComponent> | undefined;

  constructor(
    private studentService: StudentService,
    private modalService: MdbModalService
  ) {}

  ngOnInit(): void {
    if (this.studentId) this.getStudentGrades(this.studentId);

    this.subscription = this.studentService.studentGradeListChanged.subscribe(
      (studentId: number) => {
        this.studentId = studentId;
        this.getStudentGrades(studentId);
      }
    );
  }

  private getStudentGrades(studentId: number) {
    this.studentService
      .getStudentGrades(studentId)
      .subscribe((gradeDetails: Grade[]) => {
        this.gradeDetails = gradeDetails;
      });
  }

  onUpdateGrade(courseId: number, studentId: number) {
    this.modalRef = this.modalService.open(ModalComponent, {
      data: {
        action: 'update-grade',
        updateGradeParameters: {
          courseId: courseId,
          studentId: studentId,
        },
      },
    });
  }

  onDeleteGrade(courseId: number, studentId: number) {
    this.modalRef = this.modalService.open(ModalComponent, {
      data: {
        action: 'delete-grade',
        deleteGradeParameters: {
          courseId: courseId,
          studentId: studentId,
        },
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
