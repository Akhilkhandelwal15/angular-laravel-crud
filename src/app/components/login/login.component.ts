import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm:any;
  isClick = false;
  isSubmitting = false; // Flag to track form submission
  showSpinner = false;

  

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef // Inject ChangeDetectorRef

  ){
  }

  ngOnInit(){
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(){
    this.isClick = true;
     // Prevent multiple submissions
     if (this.isSubmitting || !this.loginForm.valid) {
      return;
    }

    this.isSubmitting = true; // Set flag to true to prevent further submissions
    this.showSpinner = true;
    if(this.loginForm.valid){

    
    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;

    // console.log(username, password);
    setTimeout(()=>{
      
   
    this.authService.login(username, password).subscribe((response)=>{
     
      // console.log('Authentication Succesfull');
      // console.log(response);
      let jsonArray: any = response;
      // console.log(jsonArray.token);
      if (jsonArray && jsonArray.token) {
        this.commonService.setSessionItem('token', jsonArray.token.toString());
        this.commonService.setSessionItem('user_type', jsonArray[0].user_type);
        this.commonService.checkLoggedInStatus();
        this.router.navigate(['dashboard']);
      }
    },
    (error)=>{
      this.showSpinner = false;
      // console.log("spinner",this.showSpinner);
      setTimeout(() => {
        alert("Invalid Username or Password");
      }, 100);
      // console.log("Authentication failed");
    }).add(() => {
      this.isSubmitting = false; // Reset flag after the subscription completes
      this.showSpinner = false;
    });
  },500)
  }
  else{
    this.loginForm.markAllAsTouched();
  }
  }

  get f() { return this.loginForm.controls; }

}
