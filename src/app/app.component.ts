import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { LoginComponent } from './components/login/login.component';
import { StudentDetailsComponent } from './components/student-details/student-details.component';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HeaderComponent, FooterComponent, SpinnerComponent, LoginComponent, StudentDetailsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [CommonService],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AppComponent {
  title = 'angular';
  isLoggedIn = false;
  userData = null;
  constructor(private commonService: CommonService){
    this.commonService.loggedInUserData.subscribe((data:any)=>{
      this.userData = data;
    })

    this.commonService.isUserLoggedIn.subscribe((status:boolean)=>{
      this.isLoggedIn = status;
    });
    this.commonService.checkLoggedInStatus();
  }

  ngOnInit(){ }
}
