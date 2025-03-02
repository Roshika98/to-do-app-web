import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
// import { SnackbarService } from '../../services/snackbar.service';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { AuthService } from '../../services/auth.service';
import { SnackbarService } from '../../services/snackbar.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public loginForm: FormGroup;

  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private authService: AuthService,
    private snackbarService: SnackbarService
  ) {
    this.loginForm = this.formbuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public login() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      this.loginService.login(username!, password!).subscribe({
        next: (response) => {
          const { access_token, refresh_token } = response.data;
          this.authService.storeTokens({ access_token, refresh_token });
          this.snackbarService.showSuccess('Login Success');
          this.router.navigate(['/home']);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          if (err.status === 401) {
            this.snackbarService.showError('Invalid username or password');
          } else {
            this.snackbarService.showError('Login Failed');
          }
          // this.snackBarService.showError('Invalid username or password');
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
      this.loginForm.markAsDirty();
    }
  }

  public switchToSignup() {
    this.router.navigate(['/signup']);
  }
}
