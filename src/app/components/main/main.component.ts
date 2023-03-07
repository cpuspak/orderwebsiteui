import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CommonService } from 'src/app/services/common.service/common.service';
import { LoginService } from 'src/app/services/login.service/login.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit  {
  isAdmin!: boolean
  @ViewChild(MatSidenav) drawer !: MatSidenav;
  selectedCategory: string = ''
  userNameAndExp!: any

  constructor(private commonService: CommonService,
              private loginService: LoginService){}

  ngOnInit(): void {
    this.userNameAndExp = this.loginService.getUserNameAndExpirationTime()
  }
  changeSelectedCategory(categoryName: string) {
    this.selectedCategory = categoryName
    this.drawer.close()
  }

}

