import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../Constant';

@Injectable({
  providedIn: 'root'
})
export class ListUserService {

  constructor(private http:HttpClient) { }

  listStudents(){
    return this.http.get(Constant.apiUrl + "listuser");
  }

  deleteStudent(id: any){
    return this.http.get(Constant.apiUrl + "deleteuser/"+ id);
  }

  updateStudent(id: any){
    return this.http.get(Constant.apiUrl + "getupdateuserdata/"+ id);
  }
}
