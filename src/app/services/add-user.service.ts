import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../Constant';

@Injectable({
  providedIn: 'root'
})
export class AddUserService {

  constructor(private http: HttpClient) { }

  addUser(firstname:string, lastname:string, email:string, username:string, 
    password:string, phone:string, address:string, country:string, state:string, city:string,
    qualification:string, skills:string, image:File | null){
    const formData = new FormData();
    formData.append('firstname', firstname);
    formData.append('lastname', lastname);
    formData.append('email', email);
    formData.append('username', username);
    formData.append('password', password);
    formData.append('phone', phone);
    formData.append('address', address);
    formData.append('country', country);
    formData.append('state', state);
    formData.append('city', city);
    formData.append('qualification', qualification);
    formData.append('skills', skills);
    if (image !== null) {
      formData.append('image', image);
    }

      return this.http.post(Constant.apiUrl + "adduser", formData);
  }

}
