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
  idClient:number

  constructor(private router: Router, private clientsService: ClientService) { }

  ngOnInit() {
    if (environment.token == "") {
      this.router.navigate(["/login"])
    }
    this.getAllClients()
    // this.findClientById(this.idClient)
    console.log(this.idClient)
  }

  getId(id: number) {
    this.idClient = id
   
   this.findClientById(this.idClient)
   console.log(this.idClient)
   // this.putClient()
   }

   findClientById(id: number){
    this.clientsService.getClientById(id).subscribe((resp: Clients) => {
      this.client = resp
      console.log(resp)
    })
  }

  getAllClients() {
    this.clientsService.getClients().subscribe((resp: Clients[]) => {
      this.listClients = resp
    })
  }

  postNewClient() {
    this.clientsService.createNewClient(this.client).subscribe((resp: Clients) => {
      this.client = resp;
      alert('New Client added!')
      this.getAllClients();
      this.client = new Clients();

    });
  }

  putClient(){
    this.clientsService.updateClient(this.client).subscribe((resp: Clients) => {
      this.client = resp;
      alert('Client updated successfully!')
      console.log(resp)
    });
  }
}
