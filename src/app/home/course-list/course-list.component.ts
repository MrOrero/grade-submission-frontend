import { Component } from '@angular/core';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Subscription } from 'rxjs';
import { ModalComponent } from 'src/app/modal/modal.component';
import { Course } from './course.model';
import { CourseService } from './course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
})
export class CourseListComponent {
  modalRef: MdbModalRef<ModalComponent> | undefined;
  faEllipsis = faEllipsis;
  courseList: Course[] = [];
  subscription: Subscription = new Subscription();
  constructor(
    private courseService: CourseService,
    private modalService: MdbModalService
  ) {}

  ngOnInit(): void {
    this.courseService.getStudents().subscribe();
    this.subscription = this.courseService.courseListChanged.subscribe(
      (courses: Course[]) => {
        this.courseList = courses;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onDeleteCourse(id: number) {
    this.modalRef = this.modalService.open(ModalComponent, {
      data: {
        action: 'delete-course',
        id: id,
      },
    });
  }
}
