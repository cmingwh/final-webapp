import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
// import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UserPagesComponent } from './pages/user-pages/user-pages.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AuthGuard } from './service/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  // { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'userpages', component: UserPagesComponent, canActivate: [AuthGuard] },
  // { path: 'mentor', component: MentorTrainingsComponent, canActivate: [AuthGuard] },
  // { path: 'search', component: SearchComponent },
  // { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  // { path: 'admin/tech', component: AdminTechFeeComponent, canActivate: [AuthGuard] },
  { path: '',
    redirectTo: '/userpages',
    pathMatch: 'full'
  },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
