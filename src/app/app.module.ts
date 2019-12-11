import { BrowserModule } from '@angular/platform-browser';
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
  MatPaginatorModule, MatDialogModule, MatTabsModule, MatListModule, MatIconModule, MAT_LABEL_GLOBAL_OPTIONS
} from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MentorTrainingsComponent } from './pages/mentor-trainings/mentor-trainings.component';
import { MentorCalendarComponent } from './pages/mentor-calendar/mentor-calendar.component';
import { UserPagesComponent } from './pages/user-pages/user-pages.component';
import { HeaderComponent } from './component/header/header.component';
import { EditCompanyComponent } from './pages/edit-company/edit-company.component';
import { WithdrawComponent } from './pages/withdraw/withdraw.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SkillsComponent } from './pages/skills/skills.component';
import { AdminComponent } from './pages/admin/admin.component';
import { HttpClientModule, HttpInterceptor, HttpRequest, HttpHeaders, HttpHandler, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppService } from './service/app.service';
import { AuthService } from './service/auth.service';
import { AuthGuard } from './service/auth.guard';
import { CalendarComponent } from './component/calendar/calendar.component';
import { MentorSkillsComponent } from './component/mentor-skills/mentor-skills.component';
import { DataImportComponent } from './pages/data-import/data-import.component';
import { CompaniesComponent } from './pages/companies/companies.component';
import { ExchangesComponent } from './pages/exchanges/exchanges.component';
import { IposComponent } from './pages/ipos/ipos.component';
import {FileUploadModule} from 'ng2-file-upload';
import { ViewCompanyComponent } from './pages/view-company/view-company.component';
import { EditExchangeComponent } from './pages/edit-exchange/edit-exchange.component';
import { ViewExchangeComponent } from './pages/view-exchange/view-exchange.component';
import { ViewIpoComponent } from './pages/view-ipo/view-ipo.component';
import { EditIpoComponent } from './pages/edit-ipo/edit-ipo.component';
import { CompareCompanyComponent } from './pages/compare-company/compare-company.component';
import { CompareSectorComponent } from './pages/compare-sector/compare-sector.component';
import { CompaniesChartComponent } from './pages/companies-chart/companies-chart.component';
import { SectorsChartComponent } from './pages/sectors-chart/sectors-chart.component';
import { FusionChartsModule } from 'angular-fusioncharts';

// Load FusionCharts
import * as FusionCharts from 'fusioncharts';
// Load Charts module
import * as Charts from 'fusioncharts/fusioncharts.charts';
// // Load fusion theme
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

// Add dependencies to FusionChartsModule
FusionChartsModule.fcRoot(FusionCharts, Charts, FusionTheme);

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
    MentorTrainingsComponent,
    UserPagesComponent,
    HeaderComponent,
    EditCompanyComponent,
    ViewCompanyComponent,
    WithdrawComponent,
    ProfileComponent,
    SkillsComponent,
    AdminComponent,
    MentorCalendarComponent,
    MentorSkillsComponent,
    CalendarComponent,
    DataImportComponent,
    CompaniesComponent,
    ExchangesComponent,
    IposComponent,
    EditExchangeComponent,
    ViewExchangeComponent,
    ViewIpoComponent,
    EditIpoComponent,
    CompareCompanyComponent,
    CompareSectorComponent,
    CompaniesChartComponent,
    SectorsChartComponent,
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
    HttpClientModule,
    FileUploadModule,
    FusionChartsModule
  ],
  entryComponents: [
    EditCompanyComponent,
    WithdrawComponent,
    ViewCompanyComponent,
    EditExchangeComponent,
    ViewExchangeComponent,
    ViewIpoComponent,
    EditIpoComponent,
    CompaniesChartComponent,
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [AppService, AuthService, AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true },
    {provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: {float: 'always'}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
