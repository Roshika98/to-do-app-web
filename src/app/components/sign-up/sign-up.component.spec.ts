// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { SignUpComponent } from './sign-up.component';

// describe('SignUpComponent', () => {
//   let component: SignUpComponent;
//   let fixture: ComponentFixture<SignUpComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [SignUpComponent]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(SignUpComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUpComponent } from './sign-up.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { SnackbarService } from '../../services/snackbar.service';
import { of, throwError } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let loginService: jasmine.SpyObj<LoginService>;
  let snackbarService: jasmine.SpyObj<SnackbarService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const loginServiceSpy = jasmine.createSpyObj('LoginService', ['signUp']);
    const snackbarServiceSpy = jasmine.createSpyObj('SnackbarService', [
      'showSuccess',
      'showError',
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        SignUpComponent,
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      // declarations: [SignUpComponent],
      providers: [
        FormBuilder,
        { provide: LoginService, useValue: loginServiceSpy },
        { provide: SnackbarService, useValue: snackbarServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    loginService = TestBed.inject(LoginService) as jasmine.SpyObj<LoginService>;
    snackbarService = TestBed.inject(
      SnackbarService
    ) as jasmine.SpyObj<SnackbarService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.signUpForm.value).toEqual({
      email: '',
      name: '',
      password: '',
    });
  });

  it('should mark form as invalid when empty', () => {
    expect(component.signUpForm.valid).toBeFalse();
  });

  it('should mark form as valid with valid inputs', () => {
    component.signUpForm.setValue({
      email: 'test@example.com',
      name: 'Test User',
      password: 'password123',
    });
    expect(component.signUpForm.valid).toBeTrue();
  });

  it('should call signUp service on valid form submission', () => {
    component.signUpForm.setValue({
      email: 'test@example.com',
      name: 'Test User',
      password: 'password123',
    });
    loginService.signUp.and.returnValue(of({ success: true }));

    component.signUp();

    expect(loginService.signUp).toHaveBeenCalledWith(
      'test@example.com',
      'Test User',
      'password123'
    );
    expect(snackbarService.showSuccess).toHaveBeenCalledWith('Sign Up Success');
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should show error message on sign up failure', () => {
    component.signUpForm.setValue({
      email: 'test@example.com',
      name: 'Test User',
      password: 'password123',
    });
    loginService.signUp.and.returnValue(
      throwError(() => new Error('Sign Up Failed'))
    );

    component.signUp();

    expect(snackbarService.showError).toHaveBeenCalledWith('Sign Up Failed');
  });
});
