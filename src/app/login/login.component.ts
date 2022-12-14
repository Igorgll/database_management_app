import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UserLogin } from '../model/UserLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLogin: UserLogin = new UserLogin()

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(){
    window.scroll(0, 0)
  }

  login() {
    this.auth.login(this.userLogin).subscribe({
      next: (resp: UserLogin) => {
        this.userLogin = resp 
        environment.token = this.userLogin.token
        environment.name = this.userLogin.email
        environment.id = this.userLogin.id

        this.router.navigate(['/main_page'])
      },
      error: err => {
        if (err.status == 404) {
          alert('Incorrect User or Password.')
        }
        else if (err. status == 400) {
          alert('Please fill out all fields.')
        }
      }
    })
  }

}
