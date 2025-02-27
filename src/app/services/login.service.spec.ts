import { TestBed } from '@angular/core/testing';
import { LoginService } from './login.service';
import { RequestService } from './request.service';
import { of } from 'rxjs';

describe('LoginService', () => {
  let service: LoginService;
  let requestServiceSpy: jasmine.SpyObj<RequestService>;

  beforeEach(() => {
    // Create a spy object for RequestService
    requestServiceSpy = jasmine.createSpyObj('RequestService', [
      'login',
      'postData',
    ]);

    TestBed.configureTestingModule({
      providers: [
        LoginService,
        { provide: RequestService, useValue: requestServiceSpy },
      ],
    });
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call login on RequestService with correct parameters', () => {
    const username = 'test@example.com';
    const password = 'password123';
    const mockResponse = { token: 'mockToken' };

    // Return mock data from the spy
    requestServiceSpy.login.and.returnValue(of(mockResponse));

    service.login(username, password).subscribe((response) => {
      expect(requestServiceSpy.login).toHaveBeenCalledWith({
        email: username,
        password,
      });
      expect(response).toEqual(mockResponse);
    });
  });

  it('should call signUp on RequestService with correct parameters', () => {
    const email = 'test@example.com';
    const name = 'Test User';
    const password = 'password123';
    const mockResponse = { message: 'Success' };

    // Return mock data from the spy
    requestServiceSpy.postData.and.returnValue(of(mockResponse));

    service.signUp(email, name, password).subscribe((response) => {
      expect(requestServiceSpy.postData).toHaveBeenCalledWith(
        '/auth/register',
        {
          email,
          name,
          password,
        }
      );
      expect(response).toEqual(mockResponse);
    });
  });

  it('should call regenerateAccessToken on RequestService with correct parameters', () => {
    const refreshToken = 'mockRefreshToken';
    const mockResponse = { accessToken: 'mockAccessToken' };

    // Return mock data from the spy
    requestServiceSpy.postData.and.returnValue(of(mockResponse));

    service.regenerateAccessToken(refreshToken).subscribe((response) => {
      expect(requestServiceSpy.postData).toHaveBeenCalledWith('/auth/refresh', {
        refreshToken,
      });
      expect(response).toEqual(mockResponse);
    });
  });
});
