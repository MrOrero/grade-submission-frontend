import { Component } from '@angular/core';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { Student } from './student.model';
import { StudentService } from './student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent {
  faEllipsis = faEllipsis;
  studentList: Student[] = [];
  subscription: Subscription = new Subscription();
  constructor(private studentService: StudentService) {}

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
}
