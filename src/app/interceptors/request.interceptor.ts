import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { catchError, Subject, switchMap } from 'rxjs';
import { LoginService } from '../services/login.service';

let isRefreshing = false;
const refreshTokenSubject: Subject<any> = new Subject<any>();

export const requestInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const loginService = inject(LoginService);
  const router = inject(Router);
  if (req.url.includes('auth')) {
    return next(req);
  } else {
    const access_token = authService.getAccessToken();
    if (access_token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${access_token}`,
        },
      });
    }

    return next(req).pipe(
      catchError((error) => {
        if (error.status == 401) {
          return handleTokenRefresh(
            req,
            next,
            authService,
            loginService,
            router
          );
        } else {
          throw error;
        }
      })
    );
  }
};

function handleTokenRefresh(
  req: HttpRequest<any>,
  next: HttpHandlerFn,
  authService: AuthService,
  loginService: LoginService,
  router: Router
) {
  const refresh_token = authService.getRefreshToken();

  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);
    return loginService.regenerateAccessToken(refresh_token!).pipe(
      switchMap((response) => {
        isRefreshing = false;
        authService.updateAccessToken(response.data.access_token);
        refreshTokenSubject.next(response.data.access_token);
        return next(
          req.clone({
            setHeaders: {
              Authorization: `Bearer ${response.data.access_token}`,
            },
          })
        );
      }),
      catchError((error) => {
        refreshTokenSubject.error(error);
        authService.clearTokens();
        router.navigate(['/login']);
        throw error;
      })
    );
  } else {
    return refreshTokenSubject.pipe(
      switchMap((token) => {
        return next(
          req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          })
        );
      }),
      catchError((error) => {
        authService.clearTokens();
        router.navigate(['/login']);
        throw error;
      })
    );
  }
}
