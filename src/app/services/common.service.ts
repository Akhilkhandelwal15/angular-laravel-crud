import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public userData = new BehaviorSubject({});
  loggedInUserData = this.userData.asObservable();
  
  public isLoggedIn = new BehaviorSubject(false);
  isUserLoggedIn = this.isLoggedIn.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    
  }

  setUserData(data:any){
    this.userData.next(data);
  }

  setLoginStatus(data:boolean){
    this.isLoggedIn.next(data);
  }

  checkLoggedInStatus(){
    const isloggedin = this.getSessionItem('token') ? true : false;
    this.setLoginStatus(isloggedin);
    return isloggedin;
  }

  checkForUser(){
    let isloggedin = this.getSessionItem('token') ? true : false;
    let user_type = this.getSessionItem('user_type');
    // console.log(user_type);
    if(isloggedin &&(user_type==='Admin')){
      return true;
    }else{
      return false;
    }
  }

  getSessionItem(item:string){
    return isPlatformBrowser(this.platformId) ? sessionStorage?.getItem(item) : null;
  }

  setSessionItem(item:string, value:any){
    isPlatformBrowser(this.platformId) ? sessionStorage?.setItem(item, value) : null;
  }

  removeSessionItem(item:string){
    isPlatformBrowser(this.platformId) ? sessionStorage?.removeItem(item) : null;
  }
}
