import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';
import { ListUserService } from './list-user.service';

@Injectable({
  providedIn: 'root'
})
export class ListUserResolverService {
  constructor(private listUserService: ListUserService) {

  }

  resolve(): Observable<any> {
    return this.listUserService.listStudents();
  }
}
