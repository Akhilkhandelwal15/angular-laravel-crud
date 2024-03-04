import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Constant } from '../../Constant';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  imageUrl = Constant.imageUrl;
  user_type:any;
  isStudentDropdownOpen = false;
  constructor(private commonService: CommonService, private router: Router){
    let user_type = commonService.getSessionItem('user_type');
    this.user_type = user_type;
  }
  @Input() jsonData:any;
  
  isDropdownOpen: boolean = true;

  toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
  }
  isStudentActive(): boolean {
    return this.router.isActive('/user/list', true) || this.router.isActive('/user/add', true);
} 
  
}
