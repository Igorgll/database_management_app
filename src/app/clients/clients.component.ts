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
  update = "Update Client"

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
    // this.idClient = this.route.snapshot.params['id']
  //  console.log(id)
  //  this.putClient()
   }

   findClientById(id: number){
    this.clientsService.getClientById(id).subscribe((resp: Clients) => {
      this.client = resp
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

  putClient(id: number){
    this.findClientById(this.idClient)  
    console.log(this.client)
    this.clientsService.updateClient(this.idClient, this.client).subscribe((resp: Clients) => {
      
      this.client = resp;

      console.log(resp)
    });
    console.log('clicked' + this.client)
    alert('Client updated successfully!')
    this.getAllClients();
  }

  delete(id: number) {
    this.clientsService.deleteClientById(id).subscribe(()=>{})
    alert('Cliente apagado com sucesso!')
    this.getAllClients()
    this.router.navigate(['/main_page'])
  }
}
