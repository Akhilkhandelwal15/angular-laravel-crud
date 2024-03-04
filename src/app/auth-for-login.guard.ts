import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { CommonService } from './services/common.service';

export const authForLoginGuard: CanActivateFn = (route, state) => {
  if(inject(CommonService).checkLoggedInStatus()){
    inject(Router).navigate(['/dashboard']);
    return false;
  }
  else{
    return true;
  }
};
