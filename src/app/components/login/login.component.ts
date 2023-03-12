import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from 'src/app/services/common.service/common.service';
import { LoginService } from 'src/app/services/login.service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName: string = ""
  password: string = ""
  message: string = ""
  adminLogin: boolean = false;
  loading: boolean = false
  constructor(private loginService: LoginService,
              private commonService: CommonService) { }

  ngOnInit(): void {
  }

  toggleAdminLogin(event: any) {
    console.log(this.adminLogin)
  }

  loginUser(){
    this.loading = true
    this.message = ""
    this.loginService.generateToken(this.userName, this.password).subscribe((res: any) => {
      if(res && res.token){
        try{

          this.loginService.setLoginInfos(res)
          this.message = ""
          
          if (this.adminLogin) {
            window.location.href = "admin"
          } else {
            window.location.href = ""
          }
        } catch {
          this.message = "error!"
        }
      } else this.message = "error!"
      this.loading = false
    }, err => {
      this.message = "error!"
      this.loading = false
    })
    
  }
}
