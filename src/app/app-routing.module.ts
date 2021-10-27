import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { AuthGuard } from './auth/auth.guard';
import { RoleGuard } from './auth/auth.guard';
import { RoleService } from './auth/role.service';
import { CreateUserComponent } from './create-user/create-user.component';
import { ExportCsvComponent } from './export-csv/export-csv.component';
import { LoginComponent } from './login/login.component';
import { NewIdComponent } from './new-id/new-id.component';
import { RegisterComponent } from './register/register.component';
import {ReportFormComponent} from './report-form/report-form.component';
import { StoreManageComponent } from './store-manage/store-manage.component';
import { OffenderListComponent } from './offender-list/offender-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { CreateOffenderComponent } from './create-offender/create-offender.component';
import { HomePageComponent } from './home-page/home-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { guestreportComponent } from './guestreport/guestreport.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';


const routes: Routes = [
  { path: '' , component: HomePageComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard]},
  { path: 'csv', component: ExportCsvComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent, },
  { path: 'form', component: ReportFormComponent, canActivate: [AuthGuard]},
  { path: 'add-employee', component: CreateUserComponent, canActivate: [RoleService]},
  { path: 'register', component: RegisterComponent},
  { path: 'store', component: StoreManageComponent, canActivate: [RoleService]},
  { path: 'offenders', component: OffenderListComponent, canActivate: [RoleService]},
  { path: 'add-offender', component: CreateOffenderComponent, canActivate: [RoleService]},
  { path: 'userList', component: UserListComponent, canActivate: [RoleService]},
  { path: 'newID', component: NewIdComponent, canActivate: [RoleService]},
  { path: 'guestreport', component: guestreportComponent,},
  { path: 'delete-user', component: DeleteUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
