import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../Constant';

@Injectable({
  providedIn: 'root'
})
export class StudentDataService {

  constructor(private http: HttpClient) { }

  getCountries(){
    return this.http.get(Constant.apiUrl + "countries");
  }

  getStates(countryId: any){
    let params = new HttpParams().set('countryId', countryId);
    return this.http.post(Constant.apiUrl + "states", params);
  }

  getCities(stateId: any){
    let params = new HttpParams().set('stateId', stateId);
    return this.http.post(Constant.apiUrl + "cities", params);
  }
}
