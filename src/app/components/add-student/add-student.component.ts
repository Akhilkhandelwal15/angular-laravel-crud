import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { CommonModule } from '@angular/common';
import { AsyncValidatorFn, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AddUserService } from '../../services/add-user.service';
import { StudentDataService } from '../../services/student-data.service';
import { ListUserService } from '../../services/list-user.service';
import { Constant } from '../../Constant';
import { UpdateUserServiceService } from '../../services/update-user-service.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.css'
})
export class AddStudentComponent {
  countryData:any; //country Data
  stateData:any;
  cityData:any;
  imageValue = "";
  selectedImage: File | null = null;
  url = "/assets/images/placeholder.jpeg";
  studentId:any;
  updateUserData:any;
  
  constructor(private commonService: CommonService, private route: ActivatedRoute, private formBuilder: FormBuilder,
    private addUserService: AddUserService, private router: Router, private studentDataService: StudentDataService, private listUserService: ListUserService,
    private updateUserService: UpdateUserServiceService, private http: HttpClient){
    this.commonService.setUserData(this.route.snapshot.data['resolverData']);
    this.countryData = this.route.snapshot.data['countryData'];
    this.updateUserData = this.route.snapshot.data['updateUserData'];
    // console.log("countryData",this.countryData)
  }

  addStudentForm:any;
  isClick = false;
  image_name = "";

  ngOnInit(){

    this.route.params.subscribe((params)=>{
      if(params.hasOwnProperty('id')){
        this.studentId = params['id'];
        this.listUserService.updateStudent(this.studentId).subscribe((response)=>{
          this.updateUserData = response;
          // console.log("ejdoks",this.updateUserData);
        
      
          let countryId = this.updateUserData.country;
          this.studentDataService.getStates(countryId).subscribe((data)=>{
            this.stateData = data;
          });

          const selectedStateId = this.updateUserData.state; // Get the selected state ID from updateUserData
          this.addStudentForm.get('state')?.setValue(selectedStateId);

          let stateId = this.updateUserData.state;
          this.studentDataService.getCities(stateId).subscribe((data)=>{
            this.cityData = data;
          });

          const selectedCityId = this.updateUserData.city; // Get the selected state ID from updateUserData
          this.addStudentForm.get('city')?.setValue(selectedCityId);

          if (this.updateUserData && this.updateUserData.skills) {
            const skills = this.updateUserData.skills.split(',').map((skill: string) => skill.trim());
            skills.forEach((skill: string) => {
              this.addStudentForm.get(skill)?.setValue(true);
            });
          }
          if(this.studentId && this.updateUserData.user_image===""){
            this.url = "/assets/images/placeholder.jpeg";
          }
          else{
            this.url = "http://localhost:8000/images/" + this.updateUserData.user_image;
          }
          
          this.imageValue = this.updateUserData.user_image;
          this.image_name = this.updateUserData.user_image;
          

      if (this.updateUserData) {
      this.addStudentForm.patchValue({
        firstname: this.updateUserData.firstname || '',
        lastname: this.updateUserData.lastname || '',
        username: this.updateUserData.username || '',
        password: this.updateUserData.password || '',
        email: this.updateUserData.email || '',
        address: this.updateUserData.address || '',
        phone: this.updateUserData.phone || '',
        country: this.updateUserData.country || '',
        qualification: this.updateUserData.qualification || '',
      });
    }
        });
        // console.log("update User",this.studentId)
      }
      else{
        // console.log("Add User");
      }
    })
    

    if(!this.studentId){
      this.addStudentForm = this.formBuilder.group({
        firstname: ['', Validators.required],
        lastname: [''],
        email: ['', {
          validators: [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')],
          asyncValidators: [this.emailExistsValidator()]
        }],
        username: ['',{
          validators: [Validators.required, Validators.minLength(5), Validators.maxLength(8)],
          asyncValidators: [this.usernameExistsValidator()],
        }],
        password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(8), Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{5,20}$')]],
        cnfpassword: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(8)]],
        phone: ['', [Validators.required, Validators.pattern(/^\d+$/), Validators.minLength(10), Validators.maxLength(10)]],
        address: [''],
        country: [''],
        state: [''],
        city: [''],
        cpp: [false],
        java: [false],
        angular: [false],
        laravel: [false],
        qualification: [''],
        pg: ['pg'],
        image: ['',this.fileTypeValidator(['jpg', 'jpeg', 'png'])]
      },{
        validators: [this.atLeastOneCheckboxCheckedValidator(), this.confirmPasswordValidator('password', 'cnfpassword')]
      });    
    }
    else{
      this.addStudentForm = this.formBuilder.group({
        firstname: ['', Validators.required],
        lastname: [''],
        email: ['', {
          validators: [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')],
          asyncValidators: [this.emailExistsValidator()],
        }],
        username: [{ value: '', disabled: true },{
        validators: [Validators.required, Validators.minLength(5), Validators.maxLength(8)],
        asyncValidators: [this.usernameExistsValidator()],
        }],
        phone: ['', [Validators.required, Validators.pattern(/^\d+$/), Validators.minLength(10), Validators.maxLength(10)]],
        address: [''],
        country: [''],
        state: [''],
        city: [''],
        cpp: [false],
        java: [false],
        angular: [false],
        laravel: [false],
        qualification: [''],
        pg: ['pg'],
        image: ['',this.fileTypeValidator(['jpg', 'jpeg', 'png'])]
      });
    }
    
  }
    atLeastOneCheckboxCheckedValidator() {
      return (formGroup: FormGroup) => {
        const controls = formGroup.controls;
        let atLeastOneChecked = false;
  
        Object.keys(controls).forEach(key => {
          if (controls[key].value) {
            atLeastOneChecked = true;
          }
        });
  
        if (!atLeastOneChecked) {
          return { requireCheckboxToBeChecked: true };
        }
  
        return null;
      };
    }

    confirmPasswordValidator(controlName: string, matchingControlName: string) {
      return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        // console.log(control.value,matchingControl.value);
        if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ passwordMismatch: true });
        } else {
          matchingControl.setErrors(null);
        }
      };
    }

    fileTypeValidator(allowedTypes: string[]) {
      return (control: any) => {
        const file = control.value;
        if (file) {
          const extension = file.split('.').pop()?.toLowerCase(); // Use optional chaining to handle undefined
          if (!extension || !allowedTypes.includes(extension)) {
            return { invalidFileType: true };
          }
        }
        return null;
      };
    }

    // onEmailChanges(event: any){
    //   let email = event.target.value;
    //   let params = new  HttpParams().set('email', email);
    //   this.http.post(Constant.apiUrl + 'getemail', params).subscribe((response)=>{
    //     console.log(response);
    //   });
    // }

    emailExistsValidator(): AsyncValidatorFn {
      return (control): Observable<ValidationErrors | null> => {
        const email = control.value;
        let params;
        if(this.studentId){
          params = new HttpParams().set('email', email).set('id',this.studentId);
        }
        else{
          params = new HttpParams().set('email', email).set('id',0);
        }
        
  
        return this.http.post<boolean>(Constant.apiUrl + 'getemail', params).pipe(
          map((response) => {
            return response ? { 'emailExists': true } : null;
          }),
          catchError(() => of(null)) 
        );
      };
    }
    
    usernameExistsValidator(): AsyncValidatorFn {
      return (control): Observable<ValidationErrors | null> => {
        const username = control.value;
        let params;
        if(this.studentId){
          params = new HttpParams().set('username', username).set('id',this.studentId);
        }
        else{
          params = new HttpParams().set('username', username).set('id',0);
        }
        
  
        return this.http.post<boolean>(Constant.apiUrl + 'getusername', params).pipe(
          map((response) => {
            return response ? { 'usernameExists': true } : null;
          }),
          catchError(() => of(null)) 
        );
      };
    }
    
    imageRemoveButton(){
      this.selectedImage = null;
      this.imageValue = "";
      this.url = "/assets/images/placeholder.jpeg";
      const fileInput = document.getElementById('image') as HTMLInputElement;
      if (fileInput) {
        // console.log(fileInput);
        fileInput.value = '';
      }
      this.addStudentForm.get('image').setValue('');
      this.addStudentForm.get('image').markAsUntouched();
    }

    onImageUpload(event: any){
      // to upload image in database
      this.imageValue = event.target.value;
      this.selectedImage = event.target.files[0];

      // Extract the file extension
      const file = event.target.files[0];
      const fileName = file.name;
      const fileExtension = fileName.split('.').pop();
      // console.log(fileExtension);
      // to preview image
      if(event.target.files && fileExtension===('jpeg' || 'png' || 'jpg')){
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (e:any)=>{
          this.url = e.target.result;
        }
      }else{
        this.imageValue = "";
      }
    }


    stateByCountry(event: any){
      let countryId = event.target.value
      // console.log("country id:", event.target.value);
      this.studentDataService.getStates(countryId).subscribe((data)=>{
        this.stateData = data;
        // console.log(this.stateData);
      });
    }

    cityByState(event: any){
      let stateId = event.target.value;
      this.studentDataService.getCities(stateId).subscribe((data)=>{
        this.cityData = data;
        // console.log(this.cityData);
      });
    }

  onSubmit(){
    this.isClick = true;
    // console.log("clicked", this.isClick);

    Object.keys(this.addStudentForm.controls).forEach((el)=>{
      // console.log(this.addStudentForm.get(el).errors, el);
    })
    // console.log(this.addStudentForm.error);
    if(this.addStudentForm.valid){
        // console.log("form");
      const firstname = this.addStudentForm.get('firstname').value;
      const lastname = this.addStudentForm.get('lastname').value;
      const email = this.addStudentForm.get('email').value;
      const username = this.addStudentForm.get('username').value;
      const password = this.addStudentForm.get('password')?.value ?? '';
      const phone = this.addStudentForm.get('phone').value;
      const address = this.addStudentForm.get('address').value;
      const country = this.addStudentForm.get('country').value;
      const state = this.addStudentForm.get('state').value;
      const city = this.addStudentForm.get('city').value;
      const qualification = this.addStudentForm.get('qualification').value;
      const cpp = this.addStudentForm.get('cpp').value;
      const java = this.addStudentForm.get('java').value;
      const angular = this.addStudentForm.get('angular').value;
      const laravel = this.addStudentForm.get('laravel').value;

      let skills = "";
      if(cpp===true){
        if(skills===""){
          skills = skills + 'cpp';
        }
        else{
          skills = skills + ", " + 'cpp';
        }
        
      }
      if(java===true){
        if(skills===""){
          skills = skills + 'java';
        }
        else{
          skills = skills + ", " + 'java';
        }
      }
      if(angular===true){
        if(skills===""){
          skills = skills + 'angular';
        }
        else{
          skills = skills + ", " + 'angular';
        }
      }
      if(laravel===true){
        if(skills===""){
          skills = skills + 'laravel';
        }
        else{
          skills = skills + ", " + 'laravel';
        }
      }
      // console.log(skills);
      const image = this.selectedImage;
      // console.log(image);
      if(this.studentId){
          // console.log("=======");
          this.updateUserService.updateUser(firstname, lastname, email, username, phone, address, country, state, city, qualification, skills, image, this.studentId, this.imageValue, this.image_name)
          .subscribe((response)=>{
              // console.log(response);
              this.router.navigate(['/user/list'], { queryParams: { updatesuccess: true } });
            });
        }
      else{
        this.addUserService.addUser(firstname, lastname, email, username, password, phone, address, country, state, city, qualification, skills, image)
      .subscribe((response)=>{
        // console.log("hello");
        //   console.log(response);
          this.router.navigate(['/user/list'], { queryParams: { addsuccess: true } });
        });
      }
      
    }
    
  }
  get f() { return this.addStudentForm.controls; }
}
