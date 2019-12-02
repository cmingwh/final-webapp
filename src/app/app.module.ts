import { BrowserModule, } from '@angular/platform-browser';
import { NgModule, Injectable, } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import {
  MatButtonModule, MatCheckboxModule, MatInputModule, MatCardModule, MatToolbarModule,
  MatSelectModule, MatOptionModule, MatDatepickerModule, MatNativeDateModule, MatTableModule,
  MatPaginatorModule, MatDialogModule, MatTabsModule, MatListModule, MatIconModule
} from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TrainingSearchComponent } from './pages/training-search/training-search.component';
import { MentorTrainingsComponent } from './pages/mentor-trainings/mentor-trainings.component';
import { MentorCalendarComponent } from './pages/mentor-calendar/mentor-calendar.component';
import { UserTrainingsComponent } from './pages/user-trainings/user-trainings.component';
import { HeaderComponent } from './component/header/header.component';
import { ProposeComponent } from './pages/propose/propose.component';
import { WithdrawComponent } from './pages/withdraw/withdraw.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SkillsComponent } from './pages/skills/skills.component';
import { AdminUserComponent } from './pages/admin-user/admin-user.component';
import { AdminTechFeeComponent } from './pages/admin-tech-fee/admin-tech-fee.component';
import { HttpClientModule, HttpInterceptor, HttpRequest, HttpHeaders, HttpHandler, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppService } from './service/app.service';
import { AuthService } from './service/auth.service';
import { AuthGuard } from './service/auth.guard';
import { CalendarComponent } from './component/calendar/calendar.component';
import { MentorSkillsComponent } from './component/mentor-skills/mentor-skills.component';

@Injectable()
export class XhrInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    // HttpHeader object immutable - copy values
    const headerSettings: { [name: string]: string | string[]; } = {};

    for (const key of request.headers.keys()) {
      headerSettings[key] = request.headers.getAll(key);
    }

    const token = localStorage.getItem('access_token');
    if (token) {
      headerSettings.Authorization = 'Bearer ' + token;
    }
    headerSettings['Content-Type'] = 'application/json';
    headerSettings['X-Requested-With'] = 'XMLHttpRequest';
    const newHeader = new HttpHeaders(headerSettings);

    const changedRequest = request.clone({
      headers: newHeader
    });
    return next.handle(changedRequest);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    TrainingSearchComponent,
    MentorTrainingsComponent,
    UserTrainingsComponent,
    HeaderComponent,
    ProposeComponent,
    WithdrawComponent,
    ProfileComponent,
    SkillsComponent,
    AdminUserComponent,
    AdminTechFeeComponent,
    MentorCalendarComponent,
    MentorSkillsComponent,
    CalendarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTabsModule,
    MatListModule,
    MatIconModule,
    HttpClientModule
  ],
  entryComponents: [
    ProposeComponent,
    WithdrawComponent
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [AppService, { provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true }, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
