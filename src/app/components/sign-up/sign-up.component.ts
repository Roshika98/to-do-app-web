import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  public signUpForm: FormGroup;

  constructor(
    private formbuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {
    this.signUpForm = formbuilder.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public signUp() {
    if (this.signUpForm.valid) {
      const { email, name, password } = this.signUpForm.value;
      this.loginService.signUp(email, name, password).subscribe({
        next: (response) => {
          console.log(response);
          this.snackbarService.showSuccess('Sign Up Success');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.log(err);
          this.snackbarService.showError('Sign Up Failed');
        },
      });
    }
  }
}
