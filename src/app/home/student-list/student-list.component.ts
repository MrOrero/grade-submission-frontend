import { Component } from '@angular/core';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Subscription } from 'rxjs';
import { ModalComponent } from 'src/app/modal/modal.component';
import { Student } from './student.model';
import { StudentService } from './student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent {
  modalRef: MdbModalRef<ModalComponent> | undefined;
  faEllipsis = faEllipsis;
  studentList: Student[] = [];
  subscription: Subscription = new Subscription();
  constructor(
    private studentService: StudentService,
    private modalService: MdbModalService
  ) {}

  ngOnInit(): void {
    this.studentService.getStudents().subscribe();
    this.subscription = this.studentService.studentListChanged.subscribe(
      (students: Student[]) => {
        this.studentList = students;
      }
    );
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
      // modalClass: 'modal-dialog-centered modal-lg',
      // modalClass: 'modal-lg',
    });
  }
}
