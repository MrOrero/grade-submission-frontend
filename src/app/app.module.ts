import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HomeHeaderComponent } from './home/home-header/home-header.component';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeDashboardComponent } from './home/home-dashboard/home-dashboard.component';
import { StudentListComponent } from './home/student-list/student-list.component';
import { ModalComponent } from './modal/modal.component';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import {
  NgbAlertModule,
  NgbDatepickerModule,
} from '@ng-bootstrap/ng-bootstrap';
import { JsonPipe } from '@angular/common';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { CourseListComponent } from './home/course-list/course-list.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { GradeDetailsComponent } from './student-details/grade-details/grade-details.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    HomeHeaderComponent,
    HomeDashboardComponent,
    StudentListComponent,
    ModalComponent,
    DatePickerComponent,
    CourseListComponent,
    StudentDetailsComponent,
    GradeDetailsComponent,
    CourseDetailsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    MdbModalModule,
    NgbModule,
    NgbAlertModule,
    NgbDatepickerModule,
    JsonPipe,
    NgbPaginationModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
