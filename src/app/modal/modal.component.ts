import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Student } from '../home/student-list/student.model';
import { StudentService } from '../home/student-list/student.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  date: NgbDateStruct | undefined;
  birthDate: Date | String | undefined;
  action: string | null = null;
  id: number | null = null;

  constructor(
    public modalRef: MdbModalRef<ModalComponent>,
    private studentService: StudentService
  ) {}

  onDateChange(date: NgbDateStruct | undefined) {
    this.date = date; // Set this.date to the selected NgbDateStruct value

    if (date) {
      // If date is not undefined (i.e., a date is selected)
      const year = date.year; // Get the year value
      const month = String(date.month).padStart(2, '0'); // Get the month value with leading zeros
      const day = String(date.day).padStart(2, '0'); // Get the day value with leading zeros

      // Format the birthDate as "year-month-day" string
      this.birthDate = `${year}-${month}-${day}`;
    }
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.birthDate) {
      console.log(this.birthDate);
      this.studentService
        .addStudent(
          new Student(
            form.value.name,
            form.value.department,
            this.birthDate,
            form.value.gender
          )
        )
        .subscribe();
    }
    form.reset();
    this.modalRef.close();
  }

  onDeleteStudent(id: number | null) {
    if (id) {
      this.studentService.deleteStudent(id).subscribe();
    }
    this.modalRef.close();
  }
}
