import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../Constant';

@Injectable({
  providedIn: 'root'
})
export class UpdateUserServiceService {


  constructor(private http: HttpClient) { }

  updateUser(firstname:string, lastname:string, email:string, username:string, 
    phone:string, address:string, country:string, state:string, city:string,
    qualification:string, skills:string, image:File | null, id:string, imageValue:string, imageName: string ){
    const formData = new FormData();
    formData.append('firstname', firstname);
    formData.append('lastname', lastname);
    formData.append('email', email);
    formData.append('username', username);
    formData.append('phone', phone);
    formData.append('address', address);
    formData.append('country', country);
    formData.append('state', state);
    formData.append('city', city);
    formData.append('qualification', qualification);
    formData.append('skills', skills);
    formData.append('id', id);
    formData.append('imageValue', imageValue);
    formData.append('imageName', imageName);

    
    if (image !== null) {
      formData.append('image', image);
    }
    
    return this.http.post(Constant.apiUrl + "updateuser", formData);
  }
}
