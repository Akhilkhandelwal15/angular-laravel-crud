import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CommonService } from './services/common.service';

export const checkUserGuard: CanActivateFn = (route, state) => {
  if(!inject(CommonService).checkForUser())
  {
    inject(Router).navigate(['/dashboard']);
    return false;
  }
  return true;
};
  