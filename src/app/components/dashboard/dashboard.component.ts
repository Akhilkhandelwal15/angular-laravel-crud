import { Component } from '@angular/core';
import { SpinnerComponent } from '../spinner/spinner.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from 'express';
import { StudentDetailsComponent } from '../student-details/student-details.component';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SpinnerComponent, SidebarComponent, CommonModule, HeaderComponent, RouterModule, FooterComponent, StudentDetailsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(
    private commonService: CommonService,
    private route: ActivatedRoute
  ){
    this.commonService.setUserData(this.route.snapshot.data['resolverData']);
  }
  ngOnInit(){
    
  }
}
