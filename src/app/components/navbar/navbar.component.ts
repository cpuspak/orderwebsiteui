import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { LoginService } from 'src/app/services/login.service/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() sideNav!: MatSidenav; 
  constructor(private loginService: LoginService){}

  logout() {
    this.loginService.logout()
    window.location.href = ""
  }

  toggleSideNav() {
    if (this.sideNav != undefined) this.sideNav.toggle()
  }
}
