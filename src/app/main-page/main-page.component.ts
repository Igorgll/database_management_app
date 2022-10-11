import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  
  title = "Clients list";

  constructor(private router: Router) { }

  ngOnInit() {
   window.scroll(0, 0)
  }
}
