import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(username:string, password:string){
    let params = new HttpParams()
    .set('username', username)
    .set('password', password);
    // console.log('test',params);
    return this.http.post("http://localhost:8000/api/login", params);
  }

  getUserData(token:any){
    let params = new HttpParams().set('token', token);
    // console.log('hello', params);
    return this.http.post("http://localhost:8000/api/user", params);
  }
}
