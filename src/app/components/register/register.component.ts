import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userName: string = ""
  password: string = ""
  name: string = ""
  message: string = ""
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  registerUser(){
    this.message = ""
    this.loginService.registerUser(this.userName, this.password, this.name).subscribe((res: any) => {
      if (res)  {
        this.message = "Success!"
      }
    }, 
    err => {
      console.log("error in registering")
      this.message = "Error!"
    })
  }

}