import { Component, OnInit } from '@angular/core';
import { ClientService } from './../service/clients.service';
import { Clients } from './../model/Clients';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
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
