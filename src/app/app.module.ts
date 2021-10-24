import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReportFormComponent } from './report-form/report-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExportCsvComponent } from './export-csv/export-csv.component';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuard } from './auth/auth.guard';
import { RoleGuard } from './auth/auth.guard';
import { AccountComponent } from './account/account.component';
import { RegisterComponent } from './register/register.component';
import { StoreManageComponent } from './store-manage/store-manage.component';
import { OffenderListComponent } from './offender-list/offender-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { CreateOffenderComponent } from './create-offender/create-offender.component';
import { NewIdComponent } from './new-id/new-id.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    ReportFormComponent,
    ExportCsvComponent,
    LoginComponent,
    NavigationComponent,
    CreateUserComponent,
    AccountComponent,
    RegisterComponent,
    StoreManageComponent,
    OffenderListComponent,
    UserListComponent,
    NewIdComponent,
    AccountComponent,
    CreateOffenderComponent,
    NewIdComponent,
    HomePageComponent,
    HeaderComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
