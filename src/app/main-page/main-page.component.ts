import { ClientService } from './../service/clients.service';
import { Router } from '@angular/router';
import { Clients } from './../model/Clients';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  
  searchText: any;

  //modals text
  title = "Clients List"
  create = "Create New Client"
  update = "Update New Client"

  categories = [
    { first: 'Name', second: 'Last Name', third: 'Email', fourth: 'Address', fifth: 'Postal Code' },
  ];

  client: Clients = new Clients();
  listClients: Clients[];

  constructor(private router: Router, private clientsService: ClientService) { }

  ngOnInit() {
    if (environment.token == "") {
      this.router.navigate(["/login"])
    }
    
    this.getAllClients()
  }

  getAllClients() {
    this.clientsService.getClients().subscribe((resp: Clients[]) => {
      this.listClients = resp
    })
  }
}
