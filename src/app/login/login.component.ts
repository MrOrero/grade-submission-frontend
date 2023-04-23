import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}
  onSignIn(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const username = form.value.username;
    const password = form.value.password;

    this.authService.authenticate(username, password).subscribe(() => {
      this.router.navigate(['/home']);
    });

    form.reset();
  }
}
