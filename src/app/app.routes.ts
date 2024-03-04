import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './auth.guard';
import { authForLoginGuard } from './auth-for-login.guard';
import { ResolverService } from './services/resolver.service';
import { StudentDetailsComponent } from './components/student-details/student-details.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { StudentDataResolverService } from './services/student-data-resolver.service';
import { ListUserResolverService } from './services/list-user-resolver.service';
import { checkUserGuard } from './check-user.guard';
export const routes: Routes = [
    {path:'login',component:LoginComponent, canActivate:[authForLoginGuard]},
    {path:'dashboard',component:DashboardComponent, canActivate:[authGuard], resolve:{resolverData: ResolverService}},
    {path:'user/list',component:StudentDetailsComponent, canActivate:[authGuard, checkUserGuard], resolve:{resolverData: ResolverService, listUser: ListUserResolverService}},
    {path:'user/add',component:AddStudentComponent, canActivate:[authGuard, checkUserGuard], resolve:{resolverData: ResolverService, countryData: StudentDataResolverService}},
    {path:'user/update/:id',component:AddStudentComponent, canActivate:[authGuard, checkUserGuard], resolve:{resolverData: ResolverService, countryData: StudentDataResolverService}},
    {path:'', redirectTo: 'dashboard', pathMatch: 'full'},
    {path:'**', redirectTo: 'login', pathMatch: 'full'}
    
];
