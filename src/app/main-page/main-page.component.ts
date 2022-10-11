import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  
  title = "Clients list";
  name = environment.name
  email = environment.email
  id = environment.id

  constructor(private router: Router) { }

  ngOnInit() {
   window.scroll(0, 0)
  }

  exit(){
    this.router.navigate(['/login'])
    environment.token = ''
    environment.name = ''
    environment.email = ''
    environment.id = 0 
  }
}
