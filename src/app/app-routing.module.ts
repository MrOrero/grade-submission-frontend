import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { StudentDetailsComponent } from './student-details/student-details.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: ':route', component: HomeComponent, canActivate: [AuthGuard] },
  { path: ':route', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'students/:id/details',
    component: StudentDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'courses/:id/details',
    component: CourseDetailsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
