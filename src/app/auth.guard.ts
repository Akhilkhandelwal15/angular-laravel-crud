import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { CommonService } from './services/common.service';

export const authGuard: CanActivateFn = (route, state) => {
  if(!inject(CommonService).checkLoggedInStatus())
  {
    inject(Router).navigate(['/login']);
    return false;
  }
  return true;
};