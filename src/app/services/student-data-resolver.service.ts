
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';
import { StudentDataService } from './student-data.service';

@Injectable({
  providedIn: 'root'
})
export class StudentDataResolverService {
  constructor(
    private studentDataService: StudentDataService,
    private commonService: CommonService
  ) {
  }

  resolve(): Observable<any> {
    return this.studentDataService.getCountries();
  }
}
