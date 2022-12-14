import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { AuthService } from './../service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: User = new User()
  checkPassword: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(){
    window.scroll(0, 0)
  }

  confirmPassword(event: any) {
    this.checkPassword = event.target.value
  }

  signUp() {
    if(this.user.password != this.checkPassword) {
      alert('Incorrect password.')
    }else if(this.user.name.length > 15) {
      alert('Name is too long, keep it under 15 characters.')
    }else if (this.user.password.length < 6) {
      alert('Password needs to have at least 6 characters.')
    }
    else {
      this.authService.signUp(this.user).subscribe((resp: User) => {
        this.user = resp 
        alert('User sign up successfully!')
        this.router.navigate(['/login'])
      })
    }
  }

}
