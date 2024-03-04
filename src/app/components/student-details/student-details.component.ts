import { Component } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Constant } from '../../Constant';
import { ListUserService } from '../../services/list-user.service';

declare var $:any;

@Component({
  selector: 'app-student-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css'
})
export class StudentDetailsComponent {
  imagePath = Constant.imageUrl;
  studentsData:any;
  successMessage:any;
  constructor(
    private commonService: CommonService,
    private route: ActivatedRoute,
    private listUserService: ListUserService,
    private router: Router
  ){
    this.commonService.setUserData(this.route.snapshot.data['resolverData']);
    this.studentsData = this.route.snapshot.data['listUser'];
  }
  ngOnInit(){
    this.route.queryParams.subscribe(params => {
      if (params['updatesuccess']) {
        setTimeout(() => {
          alert('User updated successfully!!');
        }, 100);
        
        this.router.navigate(['/user/list']);
      }
      if (params['addsuccess']) {
        setTimeout(() => {
          alert('User Added successfully!!');
        }, 100);
        
        this.router.navigate(['/user/list']);
      }
    });
  }
  deleteUser(id: any, name:any){
    const isConfirmed = window.confirm(`Are you sure you want to delete the user ${name}?`);    if(isConfirmed){
      this.listUserService.deleteStudent(id).subscribe((response)=>{
        // console.log(response);
        setTimeout(() => {
          alert('User deleted successfully!!');
        }, 100);
        this.studentsData = this.studentsData.filter((student: any) => student.id !== id);
      });
    }
  }
  ngAfterViewInit(){
    <any>$(document).ready(function(){
      setTimeout(() => {
        (<any>$("#table")).DataTable({
          columnDefs: [
            { targets: [1,4,6], orderable: false } // Specify the column indexes where sorting should be disabled
        ]
        });
      }, 200);
      
    })  
  }
}
