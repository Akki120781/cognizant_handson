import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const authService = inject(AuthService);
  const authorizedRequest = request.clone({
    setHeaders: {
      Authorization: `Bearer ${authService.token}`
    }
  });

  return next(authorizedRequest);
};
