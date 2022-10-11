import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../service/clients.service';
import { Clients } from '../../model/Clients';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-client-delete',
  templateUrl: './client-delete.component.html',
  styleUrls: ['./client-delete.component.css']
})
export class ClientDeleteComponent implements OnInit {

  constructor(private router: Router, private clientsService: ClientService) { }

  client: Clients = new Clients();
  listClients: Clients[];

  ngOnInit() {
    if (environment.token == "") {
      this.router.navigate(["/login"])
    }
  }

  getAllClients() {
    this.clientsService.getClients().subscribe((resp: Clients[]) => {
      this.listClients = resp
    })
  }
}
