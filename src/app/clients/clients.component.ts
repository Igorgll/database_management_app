import { Component, OnInit } from '@angular/core';
import { ClientService } from './../service/clients.service';
import { Clients } from './../model/Clients';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private router: Router, 
    private clientsService: ClientService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    if (environment.token == "") {
      this.router.navigate(["/login"])
    }
    this.getAllClients()
  }
  
  getId(id: number) {
    this.idClient = id
    this.findClientById(this.idClient)
    this.router.navigate(['main_page/', this.idClient ])
    this.idClient = this.route.snapshot.params['id']
   console.log(id)
  //  this.putClient()
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
    console.log('clicked')
    this.clientsService.updateClient(this.client).subscribe((resp: Clients) => {
      this.client = resp;
      console.log(resp)
      alert('Client updated successfully!')
      this.getAllClients();
    });
  }
}
