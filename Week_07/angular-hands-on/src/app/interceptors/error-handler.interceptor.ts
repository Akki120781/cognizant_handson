import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { GlobalMessageService } from '../services/global-message.service';

export const errorHandlerInterceptor: HttpInterceptorFn = (request, next) => {
  const router = inject(Router);
  const messages = inject(GlobalMessageService);

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        void router.navigateByUrl('/');
      }

      if (error.status >= 500) {
        messages.show('Server error while loading portal data.');
      }

      return throwError(() => error);
    })
  );
};
