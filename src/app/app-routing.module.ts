import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginAndRegisterComponent } from './components/login-and-register/login-and-register.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { RoleGuardGuard } from './roleguards/role-guard.guard';
import { AuthGuardService } from './services/authGuard.service/auth-guard.service';
import { LoginAuthService } from './services/loginAuth.service/login-auth.service';

const routes: Routes = [
  {
    path: 'auth',
    component: LoginComponent,
    canActivate: [LoginAuthService]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuardService, RoleGuardGuard],
    data : {
      expectedRoles : ['admin']
    }
  },
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'adminDashboard',
    component: AdminDashboardComponent
  }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
