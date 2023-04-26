import { Component, Input } from '@angular/core';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Subscription } from 'rxjs';
import { ModalComponent } from 'src/app/modal/modal.component';
import { CourseResponse } from './course-response.model';
import { Course } from './course.model';
import { CourseService } from './course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
})
export class CourseListComponent {
  page = 1;
  pageSize = 5;
  totalCourses: number | undefined;
  modalRef: MdbModalRef<ModalComponent> | undefined;
  faEllipsis = faEllipsis;
  @Input() isFromStudentDetail: boolean = false;
  @Input() courseList: Course[] = [];
  subscription: Subscription = new Subscription();
  constructor(
    private courseService: CourseService,
    private modalService: MdbModalService
  ) {}

  ngOnInit(): void {
    if (!this.isFromStudentDetail) {
      this.courseService
        .getCourses(this.page, this.pageSize)
        .subscribe((courseResponse: CourseResponse) => {
          this.courseList = courseResponse.courses;
          this.totalCourses = courseResponse.totalCourses;
        });
      this.subscription = this.courseService.courseListChanged.subscribe(
        (courses: Course[]) => {
          this.courseList = courses;
        }
      );
    }
  }

  onPageChange(page: number) {
    this.page = page;
    if (!this.isFromStudentDetail) {
      this.courseService.getCourses(this.page, this.pageSize).subscribe();
      this.subscription = this.courseService.courseListChanged.subscribe(
        (courses: Course[]) => {
          this.courseList = courses;
        }
      );
    }
  }

  onDeleteCourse(id: number) {
    this.modalRef = this.modalService.open(ModalComponent, {
      data: {
        action: 'delete-course',
        id: id,
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
