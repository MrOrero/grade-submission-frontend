import { Component, Input } from '@angular/core';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Subscription } from 'rxjs';
import { ModalComponent } from 'src/app/modal/modal.component';
import { StudentResponse } from './student-reponse.model';
import { Student } from './student.model';
import { StudentService } from './student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent {
  page = 1;
  pageSize = 5;
  modalRef: MdbModalRef<ModalComponent> | undefined;
  faEllipsis = faEllipsis;
  totalStudents: number | undefined;
  @Input() isFromCourseDetail: boolean = false;
  @Input() studentList: Student[] = [];
  subscription: Subscription = new Subscription();
  constructor(
    private studentService: StudentService,
    private modalService: MdbModalService
  ) {}

  ngOnInit(): void {
    if (!this.isFromCourseDetail) {
      this.studentService
        .getStudents(this.page, this.pageSize)
        .subscribe((student: StudentResponse) => {
          this.studentList = student.students;
          this.totalStudents = student.totalStudents;
        });
      this.subscription = this.studentService.studentListChanged.subscribe(
        (students: Student[]) => {
          this.studentList = students;
        }
      );
    }
  }

  onPageChange(page: number) {
    this.page = page;
    if (!this.isFromCourseDetail) {
      this.studentService.getStudents(this.page, this.pageSize).subscribe();
      this.subscription = this.studentService.studentListChanged.subscribe(
        (students: Student[]) => {
          this.studentList = students;
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onDeleteStudent(id: number) {
    this.modalRef = this.modalService.open(ModalComponent, {
      data: {
        action: 'delete-student',
        id: id,
      },
    });
  }
}
