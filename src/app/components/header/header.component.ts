import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { Constant } from '../../Constant';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
  public imageUrl = Constant.imageUrl;
  @Input() jsonData:any;
  constructor(
    private commonService: CommonService,
    private router: Router,
    private http: HttpClient
  ){
  }

  onLogout(){
    let token:any = this.commonService.getSessionItem('token');
    
    let params = new HttpParams().set('token', token);
    // console.log('hello', params);
    this.commonService.removeSessionItem('token');
    this.commonService.setUserData({});
    this.commonService.checkLoggedInStatus();
    this.router.navigate(['/login']);
    // console.log("params",params);
    this.http.post("http://localhost:8000/api/deleteToken", params)
    .subscribe(
        (response) => {
            // console.log('Token deleted successfully', response);
        },
        (error) => {
            console.error('Error deleting token', error);
        }
    );  
  }
}
