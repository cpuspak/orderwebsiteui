import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { LoginService } from 'src/app/services/login.service/login.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() sideNav!: MatSidenav; 
  @Output() switchToAdminDashboardEvent = new EventEmitter()
  @Output() switchToRegisterUserViewEvent = new EventEmitter()
  constructor(private loginService: LoginService){}

  logout() {
    this.loginService.logout()
    window.location.href = ""
  }

  toggleSideNav() {
    if (this.sideNav != undefined) this.sideNav.toggle()
  }

  triggerAdminDashboardView() {
    this.switchToAdminDashboardEvent.emit('')

  }

  triggerRegisterUserView() {
    this.switchToRegisterUserViewEvent.emit('')
  }
  isAdmin() {
    return this.loginService.isAdmin()
  }
}
