import { Component, Input, OnInit } from '@angular/core';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { StudentService } from 'src/app/home/student-list/student.service';
import { Grade } from 'src/app/shared/grade.model';

@Component({
  selector: 'app-grade-details',
  templateUrl: './grade-details.component.html',
  styleUrls: ['./grade-details.component.css'],
})
export class GradeDetailsComponent implements OnInit {
  @Input() studentId: number | undefined;
  gradeDetails!: Grade[];
  faEllipsis = faEllipsis;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    if (this.studentId)
      this.studentService
        .getStudentGrades(this.studentId)
        .subscribe((gradeDetails: Grade[]) => {
          this.gradeDetails = gradeDetails;
        });
  }
}
