import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ResolverService {
  constructor(
    private authService: AuthenticationService,
    private commonService: CommonService
  ) {
  }

  resolve(): Observable<any> {
    return this.authService.getUserData(this.commonService.getSessionItem('token') || ''); // Assuming this is an Observable method to fetch JSON data
  }
}
